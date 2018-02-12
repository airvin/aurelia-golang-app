package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"math/rand"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

func main() {
	fmt.Println("main function called")
	router := mux.NewRouter()
	router.HandleFunc("/getdata", GetData)
	log.Fatal(http.ListenAndServe(":3000", 
		handlers.CORS(handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"}), 
		handlers.AllowedMethods([]string{"GET", "POST", "PUT", "HEAD", "OPTIONS"}), 
		handlers.AllowedOrigins([]string{"*"}))(router)))
}

func GetData(w http.ResponseWriter, req *http.Request) {
	rand := rand.Intn(3)
	fmt.Println(rand%3)
	type Question struct {
		Name string
		Answer string
	}

	question := Question{"What is the capital of Australia?","Canberra"}
	if (rand%3==1) {
		question = Question{"What is the capital of Canada?","Ottawa"}
	} else	if (rand%3==2) {
		question = Question{"What is the capital of Germany?","Berlin"}
	}
	json.NewEncoder(w).Encode(question)

	return
}


