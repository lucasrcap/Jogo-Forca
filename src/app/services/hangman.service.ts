import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


const defaultJSONPath = 'assets/languages.json';

@Injectable({
  providedIn: 'root'
})
export class HangmanService {

  constructor(private http: HttpClient) { }

  getQuestions(jsonPath: string = defaultJSONPath) {
    return this.http.get<{ category: string; items: string[]}>(jsonPath);
  }
}
