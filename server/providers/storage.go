package providers

import (
	"cloud.google.com/go/storage"
	"context"
	"fmt"
	"io"
	"io/ioutil"
	"mime/multipart"
	"time"
)

type Storage interface {
	UploadFile(file multipart.File, bucket, object string) error
	DownloadFile(bucket, fileName string) ([]byte, error)
}

type GoogleStorage struct{}

func (s *GoogleStorage) UploadFile(file multipart.File, bucket, object string) error {
	ctx := context.Background()
	client, err := storage.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("storage.NewClient: %v", err)
	}
	defer client.Close()

	ctx, cancel := context.WithTimeout(ctx, time.Second*50)
	defer cancel()

	// Upload an object with storage.Writer.
	wc := client.Bucket(bucket).Object(object).NewWriter(ctx)
	if _, err = io.Copy(wc, file); err != nil {
		return fmt.Errorf("io.Copy: %v", err)
	}
	if err := wc.Close(); err != nil {
		return fmt.Errorf("Writer.Close: %v", err)
	}

	fmt.Printf("Blob %v uploaded.\n", object)
	return nil
}

func (s *GoogleStorage) DownloadFile(bucket, fileName string) ([]byte, error) {
	// [START download_file]
	ctx := context.Background()
	client, err := storage.NewClient(ctx)

	ctx, cancel := context.WithTimeout(ctx, time.Second*50)
	defer cancel()
	rc, err := client.Bucket(bucket).Object(fileName).NewReader(ctx)
	if err != nil {
		return nil, err
	}
	defer rc.Close()

	data, err := ioutil.ReadAll(rc)
	if err != nil {
		return nil, err
	}
	return data, nil
}
