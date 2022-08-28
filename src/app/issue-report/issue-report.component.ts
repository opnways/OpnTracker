import { Component, EventEmitter, Input, OnInit, Output,  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IssuesService } from '../issues.service';
@Component({
  selector: 'app-issue-report',
  templateUrl: './issue-report.component.html',
  styleUrls: ['./issue-report.component.css']
})
export class IssueReportComponent implements OnInit {
  @Input() issueNo: number | null = null;
  @Output() formClose = new EventEmitter();
  issueForm: FormGroup | undefined;
 
  issueData: any = {
    title: '',
    description: '',
    priority: '',
    type: '',

  }
  constructor(private builder: FormBuilder, private issueService: IssuesService) { }

  ngOnInit(): void {  
    console.log(this.issueNo);
    this.issueForm = this.builder.group({
    title: ['', Validators.required],
    description: [''],
    priority: ['', Validators.required],
    type: ['', Validators.required]
  });
  if(this.issueNo != null){
    this.issueData =  this.getIssue(this.issueNo);
  } else {
    this.issueNo = null;
    this.issueData = {
      title: '',
      description: '',
      priority: '',
      type: '',
    }
  }
}
  addIssue() {
    if(this.issueForm && this.issueForm.invalid) { 
      this.issueForm.markAllAsTouched();
      return;
    }
    this.issueService.createIssue(this.issueForm?.value);
    this.formClose.emit();
    this.issueNo = null;
  }

  getIssue(issueNo: number) { 
    return this.issueService.getIssue(issueNo);
  }

  modifyIssue() {
    if(this.issueForm && this.issueForm.invalid) { 
      this.issueForm.markAllAsTouched();
      return;
    }
    this.issueService.modifyIssue(this.issueForm?.value);
    this.issueNo = null;
    this.formClose.emit();
    
  }


}
