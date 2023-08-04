import { Component, OnInit } from "@angular/core";
import { NonNullableFormBuilder } from "@angular/forms";
import { ProviderResDto } from "../../../dto/provider/provider.res.dto";
import { ProviderService } from "../../../service/provider.service";

@Component({
    selector : 'provider',
    templateUrl : './provider.component.html'
})
export class ProviderComponent implements OnInit{


    providers! : ProviderResDto[];
    providerReqDto = this.fb.group({
        providerName : [null],
        fileName : [''],
        fileExt : ['']
    })
    providerUpdateDto = this.fb.group({
      id : [0],
      providerName : [],
      fileName : [''],
      fileExt : ['']
  })
  deleteId! : number;
    constructor(private providerService :ProviderService,
        private fb : NonNullableFormBuilder){}

    ngOnInit(): void {
        this.getProvider();
    }

    getProvider(){
        this.providerService.getAll().subscribe(result=>{
            this.providers = result;
        })
    }
    onClick(providerId : number) : void{
      this.providerUpdateDto.patchValue({
        id : providerId
      })
     this.deleteId = providerId;
    }

    onUpdate(): void {
      const data = this.providerUpdateDto.getRawValue();
      this.providerService.update(data).subscribe(result => {
        this.getProvider();
      })
    }
  
    onDelete() : void{
     this.providerService.delete(this.deleteId).subscribe(result =>{
        this.getProvider();
     })
    }
    onSubmit():void{
        const data = this.providerReqDto.getRawValue();
        this.providerReqDto.getRawValue();
        this.providerService.create(data).subscribe(result => {
          this.getProvider();
        })
    }


    fileUpload(event: any) {
        const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            if (typeof reader.result === "string") resolve(reader.result)
          };
          reader.onerror = error => reject(error);
        });
      
        for (let file of event.target.files) {
          toBase64(file).then(result => {
            const resultBase64 = result.substring(result.indexOf(",") + 1, result.length)
            const resultExtension = file.name.substring(file.name.indexOf(".") + 1, file.name.length)
         
            this.providerReqDto.patchValue({
                fileName : resultBase64,
                fileExt : resultExtension
            })
            this.providerUpdateDto.patchValue({
              fileName: resultBase64,
              fileExt: resultExtension
            })
          })
        }
      }
    
}