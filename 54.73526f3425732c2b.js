"use strict";(self.webpackChunkTerraForm=self.webpackChunkTerraForm||[]).push([[54],{6861:(B,v,a)=>{a.r(v),a.d(v,{LevelModule:()=>S});var u=a(817),r=a(8765),g=a(2795),d=a(6153),c=a(7036),b=a(7964),m=a.n(b),e=a(3333),p=a(770),_=a(8617),h=a(5391);function L(i,s){if(1&i){const t=e.EpF();e.TgZ(0,"button",39),e.NdJ("click",function(){e.CHM(t);const n=e.oxw();return e.KtG(n.toggleModal())}),e.TgZ(1,"span",40),e._UZ(2,"i",41),e.qZA(),e._uU(3," Registrar participante"),e.qZA()}}function C(i,s){if(1&i){const t=e.EpF();e.TgZ(0,"button",42),e.NdJ("click",function(){e.CHM(t);const n=e.oxw();return e.KtG(n.deleteProduct())}),e.TgZ(1,"span",40),e._UZ(2,"i",43),e.qZA(),e._uU(3," Eliminar"),e.qZA()}}function w(i,s){if(1&i&&(e.TgZ(0,"option",58),e._uU(1),e.qZA()),2&i){const t=s.$implicit;e.Q6J("value",t.UUID),e.xp6(1),e.Oqu(t.Name)}}function Z(i,s){if(1&i){const t=e.EpF();e.TgZ(0,"button",36),e.NdJ("click",function(){e.CHM(t);const n=e.oxw(2);return e.KtG(n.registreStudent())}),e._uU(1,"Registrar"),e.qZA()}}function T(i,s){if(1&i){const t=e.EpF();e.TgZ(0,"div",44)(1,"div",45)(2,"div",46)(3,"div",47)(4,"h5",48),e._uU(5,"Registrar participante"),e.qZA(),e.TgZ(6,"button",49),e.NdJ("click",function(){e.CHM(t);const n=e.oxw();return e.KtG(n.toggleModal())}),e.TgZ(7,"span"),e._uU(8,"\xd7"),e.qZA()()(),e.TgZ(9,"div",50)(10,"form",8)(11,"div",15)(12,"label",51),e._uU(13,"Estudiante"),e.qZA(),e.TgZ(14,"select",52),e.NdJ("change",function(n){e.CHM(t);const l=e.oxw();return e.KtG(l.selectStudent(n))}),e.TgZ(15,"option",53),e._uU(16,"Elegir..."),e.qZA(),e.YNc(17,w,2,2,"option",54),e.qZA()()()(),e.TgZ(18,"div",55)(19,"button",56),e.NdJ("click",function(){e.CHM(t);const n=e.oxw();return e.KtG(n.toggleModal())}),e._uU(20,"Cerrar"),e.qZA(),e.YNc(21,Z,2,0,"button",57),e.qZA()()()()}if(2&i){const t=e.oxw();e.xp6(10),e.Q6J("formGroup",t.formStudent),e.xp6(7),e.Q6J("ngForOf",t.studentsSelect),e.xp6(4),e.Q6J("ngIf",!t.errorDevice)}}function U(i,s){1&i&&e._UZ(0,"div",59)}let f=(()=>{class i{constructor(t,o,n,l){this._service=t,this.router=o,this.route=n,this.alert=l,this.formHasBeenSave=!1,this.hasnewimage=!1,this.showLoader=!0,this.disableForm=!1,this.uuid=null,this.viewType="add",this.btnlabel="Agregar",this.studentToAddUUID=null,this.StudentsBylevel=[],this.showModal=!1,this.studentsSelect=[],this.studentsSelectAux=[],this.selecteStudentUUID=null,this.createForm(),this.subscribeChangeForm(),this.loadSelect()}ngOnInit(){this.showLoader=!0,this.route.params.subscribe(t=>{this.uuid=t.uuid,void 0!==this.uuid?(this.showLoader=!1,this.viewType="edit",this.loadlevel(),this.btnlabel="Guardar"):this.showLoader=!1})}subscribeChangeForm(){this.formLevel.valueChanges.subscribe(t=>{this.formLevel.pristine||(this.formHasBeenSave=!1)})}loadlevel(){this.showLoader=!0,this._service.getLevelByUuid(this.uuid).subscribe(t=>{this.StudentsBylevel=t.StudentsBylevel,this.filterStudentsRegistred(),this.setFormProduct(t),this.showLoader=!1})}setFormProduct(t){this.formLevel.get("Name").patchValue(t.Name),this.formLevel.get("Amount").patchValue(t.Amount),this.formLevel.get("Description").patchValue(t.Description),this.formLevel.get("Status").patchValue(t.Status),this.formLevel.get("UUID").patchValue(t.UUID)}createForm(){this.formLevel=new r.cw({Name:new r.NI("",[r.kI.required]),Amount:new r.NI(0,[r.kI.required]),Observation:new r.NI(""),Description:new r.NI(""),Company:new r.NI(""),Status:new r.NI(1),UUID:new r.NI("")}),this.formStudent=new r.cw({UUID:new r.NI("")})}sendForm(){var t=this;return(0,c.Z)(function*(){if(t.formHasBeenSave=!0,t.disableForm=!0,t.formLevel.valid){t.showLoader=!0;let o=t.formLevel.value;"add"==t.viewType?t._service.addLevel({level:o}).subscribe(function(){var n=(0,c.Z)(function*(l){t.alert.success("Registro Creado","Se ha creado el registro"),t.showLoader=!1,t.goBack()});return function(l){return n.apply(this,arguments)}}(),n=>{console.log(n),t.disableForm=!1,t.showLoader=!1}):(t.alert.success("Registro Actualizado","Se ha actualizado el registro"),t._service.updLevel({level:o}).subscribe(function(){var n=(0,c.Z)(function*(l){console.log(l),t.showLoader=!1});return function(l){return n.apply(this,arguments)}}(),n=>{console.log(n),t.disableForm=!1,t.showLoader=!1}))}else t.showLoader=!1,t.alert.warning("Campos invalidos","Verifique los campos marcados")})()}deleteProduct(){m().fire({title:"Cuidado",text:"\xbfDesea eliminar el registro?",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Si, Eliminar!",cancelButtonText:"Cancelar"}).then(t=>{console.log(t),t.isConfirmed&&this._service.delLevel({uuid:this.uuid}).subscribe(o=>{this.goBack()})})}goBack(){this.router.navigate(["admin/levels"])}validatorOfInput(t){let l,o=this.formLevel.get(t);if(!(o.touched&&o.invalid||this.formHasBeenSave&&o.invalid))return"";if(o.errors.required)return l="Campo Requerido.",l;if(o.errors.pattern)return l="El formato no es valido",l;if(o.errors.minlength)return l=`Debe contener al menos ${o.errors.minlength.requiredLength} caracteres`,l;if(o.errors.maxlength){let I=o.value.substring(0,o.value.length-1);o.patchValue(I)}}toggleModal(){this.showModal=!this.showModal}loadSelect(){this.showLoader=!0,this._service.getResources().subscribe(t=>{this.studentsSelectAux=t.students,this.filterStudentsRegistred(),this.showLoader=!1})}filterStudentsRegistred(){this.studentsSelect=this.studentsSelectAux.filter(t=>!this.StudentsBylevel.some(o=>o.studentUUID===t.UUID))}selectStudent(t){this.selecteStudentUUID=t.target.value}registreStudent(){this.showLoader=!0,this._service.registrationStudent({student:this.selecteStudentUUID,level:this.uuid}).subscribe(t=>{this.alert.success("Inscripcion","la inscripcion fue exitosa"),this.StudentsBylevel=t,this.filterStudentsRegistred(),this.toggleModal(),this.showLoader=!1})}deleteRegistrationStudent(t){m().fire({title:"Cuidado",text:"\xbfDesea eliminar el registro?",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Si, Eliminar!",cancelButtonText:"Cancelar"}).then(o=>{console.log(o),this.showLoader=!0,o.isConfirmed?this._service.DeleteRegistrationStudent({student:t.uuid,level:this.uuid}).subscribe(n=>{this.StudentsBylevel=n,this.filterStudentsRegistred(),this.showLoader=!1}):this.showLoader=!1})}}return i.\u0275fac=function(t){return new(t||i)(e.Y36(p.r),e.Y36(d.F0),e.Y36(d.gz),e.Y36(_.c))},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-level-crud"]],decls:70,vars:9,consts:[[1,"row","page-titles","mx-0"],[1,"col-sm-6","p-md-0"],[1,"welcome-text"],[1,"mb-1"],[1,"col-sm-6","p-md-0","justify-content-sm-end","mt-2","mt-sm-0","d-flex"],["class","btn btn-primary btn-sl-sm mr-3","type","button",3,"click",4,"ngIf"],["class","btn btn-danger btn-sl-sm mr-3","type","button",3,"click",4,"ngIf"],["type","button",1,"btn","btn-warning",3,"click"],[1,"form-valide",3,"formGroup"],[1,"row"],[1,"col-12","col-lg-8"],[1,"card","mb-4"],[1,"card-header"],[1,"card-tile","mb-0"],[1,"card-body"],[1,"mb-3"],[1,"form-group"],["for","Name",1,"form-label"],["type","text","id","Name","placeholder","Nombre","formControlName","Name","name","Name","aria-label","Product title",1,"form-control"],[1,""],["for","Description",1,"form-label"],["type","text","id","Description","placeholder","Descripci\xf3n del producto","formControlName","Description","name","Description","aria-label","Description",1,"form-control"],[1,"col-12","col-lg-4"],[1,"card-title","mb-0"],["for","amount",1,"form-label"],["type","text","id","amount","placeholder","$10","name","Amount","formControlName","Amount","aria-label","amount",1,"form-control"],["for","Status"],[1,"text-danger"],["id","Status","name","Status","formControlName","Status",1,"form-control"],["value",""],["value","1"],["value","2"],[1,"col-12"],[3,"rowData","idTable","deleteRow"],[1,"col-lg-12"],[1,"col","d-flex","justify-content-end"],["type","button",1,"btn","btn-primary",3,"click"],["class","modal fade show","id","exampleModalCenter","tabindex","-1","role","dialog","aria-labelledby","exampleModalLabel","aria-hidden","true","style","padding-right: 15px; display: block;",4,"ngIf"],["class","modal-backdrop fade show",4,"ngIf"],["type","button",1,"btn","btn-primary","btn-sl-sm","mr-3",3,"click"],[1,"mr-2"],[1,"fa","fa-check"],["type","button",1,"btn","btn-danger","btn-sl-sm","mr-3",3,"click"],[1,"fa","fa-trash"],["id","exampleModalCenter","tabindex","-1","role","dialog","aria-labelledby","exampleModalLabel","aria-hidden","true",1,"modal","fade","show",2,"padding-right","15px","display","block"],["role","document",1,"modal-dialog","modal-dialog-centered"],[1,"modal-content"],[1,"modal-header"],[1,"modal-title"],["type","button","data-dismiss","modal",1,"close",3,"click"],[1,"modal-body"],["for","Student"],["id","Student","required","","formControlName","UUID",1,"custom-select","d-block","w-100",3,"change"],["value","","selected",""],[3,"value",4,"ngFor","ngForOf"],[1,"modal-footer"],["type","button","data-dismiss","modal",1,"btn","btn-secondary",3,"click"],["type","button","class","btn btn-primary",3,"click",4,"ngIf"],[3,"value"],[1,"modal-backdrop","fade","show"]],template:function(t,o){1&t&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"h4"),e._uU(4,"Curso"),e.qZA(),e.TgZ(5,"p",3),e._uU(6,"nuevo registro"),e.qZA()()(),e.TgZ(7,"div",4),e.YNc(8,L,4,0,"button",5),e.YNc(9,C,4,0,"button",6),e.TgZ(10,"button",7),e.NdJ("click",function(){return o.goBack()}),e._uU(11),e.qZA()()(),e.TgZ(12,"form",8)(13,"div",9)(14,"div",10)(15,"div",11)(16,"div",12)(17,"h5",13),e._uU(18,"Informaci\xf3n del Curso"),e.qZA()(),e.TgZ(19,"div",14)(20,"div",15)(21,"div",16)(22,"label",17),e._uU(23,"Nombre"),e.qZA(),e._UZ(24,"input",18),e.qZA()(),e.TgZ(25,"div",15)(26,"div",19)(27,"div",16)(28,"label",20),e._uU(29,"Descripci\xf3n"),e.qZA(),e._UZ(30,"input",21),e.qZA()()()()()(),e.TgZ(31,"div",22)(32,"div",11)(33,"div",12)(34,"h5",23),e._uU(35,"Precio"),e.qZA()(),e.TgZ(36,"div",14)(37,"div",16)(38,"label",24),e._uU(39,"Monto"),e.qZA(),e._UZ(40,"input",25),e.qZA(),e.TgZ(41,"div",16)(42,"label",26),e._uU(43,"Estado "),e.TgZ(44,"span",27),e._uU(45,"*"),e.qZA()(),e.TgZ(46,"select",28)(47,"option",29),e._uU(48,"Please select"),e.qZA(),e.TgZ(49,"option",30),e._uU(50,"Activo"),e.qZA(),e.TgZ(51,"option",31),e._uU(52,"inactivo"),e.qZA()()()()()(),e.TgZ(53,"div",32)(54,"div",11)(55,"div",12)(56,"h5",23),e._uU(57,"Estudiantes Inscritos"),e.qZA()(),e.TgZ(58,"div",14)(59,"app-table-terra",33),e.NdJ("deleteRow",function(l){return o.deleteRegistrationStudent(l)}),e.qZA()()()()(),e.TgZ(60,"div",9)(61,"div",34)(62,"div",11)(63,"div",14)(64,"div",19)(65,"div",35)(66,"button",36),e.NdJ("click",function(){return o.sendForm()}),e._uU(67),e.qZA()()()()()()()(),e.YNc(68,T,22,3,"div",37),e.YNc(69,U,1,0,"div",38)),2&t&&(e.xp6(8),e.Q6J("ngIf","edit"==o.viewType),e.xp6(1),e.Q6J("ngIf","edit"==o.viewType),e.xp6(2),e.Oqu("salir"),e.xp6(1),e.Q6J("formGroup",o.formLevel),e.xp6(47),e.Q6J("rowData",o.StudentsBylevel)("idTable",5),e.xp6(8),e.Oqu(o.btnlabel),e.xp6(1),e.Q6J("ngIf",o.showModal),e.xp6(1),e.Q6J("ngIf",o.showModal))},dependencies:[u.sg,u.O5,h.x,r._Y,r.YN,r.Kr,r.Fj,r.EJ,r.JJ,r.JL,r.Q7,r.sg,r.u]}),i})();var x=a(2306);const y=[{path:"",component:(()=>{class i{constructor(t,o,n){this._service=t,this.router=o,this.route=n,this.Levels=[],this.showLoader=!0,this.metrics={completed:0,electronic:0,cash:0,pending:0}}ngOnInit(){this.getList()}getList(){this.showLoader=!0,this._service.getLevels().subscribe(t=>{console.log(t),this.Levels=t,this.showLoader=!1})}loadAnalytics(){}deleteLevel(t){m().fire({title:"Cuidado",text:"\xbfDesea eliminar el registro?",icon:"warning",showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:"Si, Eliminar!",cancelButtonText:"Cancelar"}).then(o=>{console.log(o),this.showLoader=!0,o.isConfirmed?this._service.delLevel({uuid:t.uuid}).subscribe(n=>{this.showLoader=!1,this.getList()}):this.showLoader=!1})}goToAdd(){this.router.navigate(["admin/levels/new"])}}return i.\u0275fac=function(t){return new(t||i)(e.Y36(p.r),e.Y36(d.F0),e.Y36(d.gz))},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-level-list"]],decls:19,vars:3,consts:[[1,"row","page-titles","mx-0"],[1,"col-sm-6","p-md-0"],[1,"welcome-text"],[1,"mb-1"],[1,"col-sm-6","p-md-0","justify-content-sm-end","mt-2","mt-sm-0","d-flex"],["type","button",1,"btn","btn-primary","btn-sl-sm","mr-3",3,"click"],[1,"mr-2"],[1,"fa","fa-plus"],[1,"row"],[1,"col-12"],[1,"card"],[1,"card-body"],[2,"width","100%","height","100%"],[3,"rowData","idTable","deleteRow"],[3,"showLoader"]],template:function(t,o){1&t&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"h4"),e._uU(4,"Cursos"),e.qZA(),e.TgZ(5,"p",3),e._uU(6,"Cursos Registrados"),e.qZA()()(),e.TgZ(7,"div",4)(8,"button",5),e.NdJ("click",function(){return o.goToAdd()}),e.TgZ(9,"span",6),e._UZ(10,"i",7),e.qZA(),e._uU(11," Nuevo registro"),e.qZA()()(),e.TgZ(12,"div",8)(13,"div",9)(14,"div",10)(15,"div",11)(16,"div",12)(17,"app-table-terra",13),e.NdJ("deleteRow",function(l){return o.deleteLevel(l)}),e.qZA()()()()()(),e._UZ(18,"app-loader",14)),2&t&&(e.xp6(17),e.Q6J("rowData",o.Levels)("idTable",4),e.xp6(1),e.Q6J("showLoader",o.showLoader))},dependencies:[h.x,x.R]}),i})()},{path:"new",component:f},{path:"update/:uuid",component:f}];let A=(()=>{class i{}return i.\u0275fac=function(t){return new(t||i)},i.\u0275mod=e.oAB({type:i}),i.\u0275inj=e.cJS({imports:[d.Bz.forChild(y),d.Bz]}),i})(),S=(()=>{class i{}return i.\u0275fac=function(t){return new(t||i)},i.\u0275mod=e.oAB({type:i}),i.\u0275inj=e.cJS({imports:[A,u.ez,g.m,r.UX]}),i})()}}]);