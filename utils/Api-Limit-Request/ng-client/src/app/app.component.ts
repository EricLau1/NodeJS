import { Component } from '@angular/core';
import { TestService } from './test.service';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

	response = null;
	message = '';
	alertColor = 'info'
	errorMessage = '';

	min = 1;
	max = 10;
 
 	constructor(public service: TestService) {

 		this.service.getData()
 			.subscribe(data => console.log(data));

 	}

 	public onSubmit(form: FormGroup) {
 		
 		if(form.valid) {

 			console.log(form.value);
			this.message = `Você enviou ${form.value.data} Mb.`;
			console.log(this.message);

			this.service.postData( this.getData(form.value.data) )
				.subscribe(result => {
					this.response = result;
					this.errorMessage = '';
					console.log(this.response);
				},
				error => {
					this.response = null;
					console.log('Oops! Ocorreu um erro. Estourou o limite da Api!');
					this.errorMessage = 'Oops! Ocorreu um erro. Estourou o limite da Api!';
				});	
 		}
 
 	}

 	private getData(mb: number) {
 		let data = "";
 		for(let i = 0; i < ((mb * 1024) * 1024); i++ ) {
 			if(i % 2 == 0) {
 				data += "1";			
 			} else {
 				data += "0";
 			}
 		}
 		return { data: data };
 	}
}
