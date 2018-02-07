package main

import (
	"fmt"
	"encoding/json"
	"log"
	"net/http"
	"github.com/gorilla/mux"
	"github.com/gorilla/handlers"
)

func main() {
	fmt.Println("main function called")
	router := mux.NewRouter()
	router.HandleFunc("/getdata",GetData)
	log.Fatal(http.ListenAndServe(":12345", handlers.CORS(handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"}), handlers.AllowedMethods([]string{"GET", "POST", "PUT", "HEAD", "OPTIONS"}), handlers.AllowedOrigins([]string{"*"}))(router)))}

func GetData(w http.ResponseWriter, req *http.Request) {
	type Question struct {
		Name string
	}
	title := Question{"Data from the Golang API"}
	message, err := json.Marshal(title)
	fmt.Println("GetData function called")
	fmt.Println(message)
	fmt.Println(err)
	json.NewEncoder(w).Encode(title)
	return
}