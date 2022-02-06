package handlers

import (
	"fmt"
	"github.com/alexrv11/credicuotas/server/middlewares"
	"github.com/alexrv11/credicuotas/server/providers"
	"github.com/alexrv11/credicuotas/server/services"
	"github.com/go-chi/chi/v5"
	"github.com/google/uuid"
	"github.com/spf13/viper"
	"go.uber.org/zap"
	"net/http"
)

type File struct {
	provider *providers.Provider
	core     *services.Core
}

func NewFile(provider *providers.Provider, core *services.Core) *File {
	return &File{provider: provider, core: core}
}

func (f *File) UploadFile(w http.ResponseWriter, r *http.Request) {
	id, _ := uuid.NewUUID()
	logger := f.provider.Logger()

	r.ParseMultipartForm(32 << 20)
	file, header, err := r.FormFile("data")
	if err != nil {
		logger.Error(fmt.Sprintf("input upload file error %s", err.Error()))
		http.Error(w, err.Error(), 400)
		return
	}

	bucket := viper.GetString("BUCKET_STORAGE_FILE")

	fileName := fmt.Sprintf("%s%s", id, header.Filename)

	err = f.provider.Storage().UploadFile(file, bucket, fileName)
	if err != nil {
		logger.Error(fmt.Sprintf("error upload google storage %s", err.Error()))
		http.Error(w, err.Error(), 400)
		return
	}

	loanID := r.FormValue("loanId")
	requirementType := r.FormValue("requirementType")

	userXid, _ := r.Context().Value(middlewares.UserInfoKey).(string)

	err = f.core.Loan.SaveDocuments(f.provider, userXid, loanID, requirementType, fileName)
	if err != nil {
		logger.Error(fmt.Sprintf("error save doc on db %s", err.Error()))
		http.Error(w, err.Error(), 400)
		return
	}
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("success upload file"))
}

func (f *File) GetFile(w http.ResponseWriter, r *http.Request) {

	fileName := chi.URLParam(r, "fileName")
	logger := f.provider.Logger()

	bucket := viper.GetString("BUCKET_STORAGE_FILE")

	data, err := f.provider.Storage().DownloadFile(bucket, fileName)
	if err != nil {
		logger.Error(zap.Error(err))
		http.Error(w, http.StatusText(400), 400)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write(data)
}
