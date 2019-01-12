import { Component, Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
@Injectable({
  providedIn: "root"
})
export class AppComponent {
  title = "Scrabbler";
  wordsList = [];
  apiUrl: string = "http://localhost:8080/word";
  score: number = this.getTotalScore();

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  onWordSubmitted(word: string) {
    if (word) {
      this.http.get(`${this.apiUrl}?word=${word}`).subscribe(res => {
        this.wordsList.push(res);
      });
    } else {
      this.http.get(this.apiUrl).subscribe(res => {
        this.wordsList.push(res);
      });
    }
  }

  getTotalScore() {
    console.log(
      this.wordsList.reduce(function(acc, nextVal) {
        return acc + nextVal.val;
      }, 0)
    );
  }
}
