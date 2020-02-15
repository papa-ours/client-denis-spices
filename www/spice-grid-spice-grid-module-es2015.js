(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["spice-grid-spice-grid-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/spice-grid/spice-grid.page.html":
/*!***************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/spice-grid/spice-grid.page.html ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-content>\n  <ion-grid fixed>\n    <ion-row>\n      <ion-col size=\"3\"></ion-col>\n      <ion-col size=\"6\">\n        <div id=\"spice-grid\">\n          <app-spice *ngFor=\"let spice of spices\" [label]=\"spice.label\" [type]=\"spice.type\" (editEvent)=\"getSpices()\">\n          </app-spice>\n        </div>\n      </ion-col>\n      <ion-col size=\"3\"></ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/spice/spice.component.html":
/*!**********************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/spice/spice.component.html ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"container\" [style.background]=\"type.color\" (click)=\"showAlert()\">\n  <p>\n    {{label}}\n  </p>\n  <img *ngIf=\"imageSource != '-1'; else loader\" src={{imageSource}}/>\n  <ng-template #loader>\n    <ion-spinner name=\"circular\"></ion-spinner>\n  </ng-template>\n</div>\n"

/***/ }),

/***/ "./src/app/spice-grid/spice-grid-routing.module.ts":
/*!*********************************************************!*\
  !*** ./src/app/spice-grid/spice-grid-routing.module.ts ***!
  \*********************************************************/
/*! exports provided: SpiceGridPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SpiceGridPageRoutingModule", function() { return SpiceGridPageRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _spice_grid_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./spice-grid.page */ "./src/app/spice-grid/spice-grid.page.ts");




const routes = [
    {
        path: '',
        component: _spice_grid_page__WEBPACK_IMPORTED_MODULE_3__["SpiceGridPage"]
    }
];
let SpiceGridPageRoutingModule = class SpiceGridPageRoutingModule {
};
SpiceGridPageRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
    })
], SpiceGridPageRoutingModule);



/***/ }),

/***/ "./src/app/spice-grid/spice-grid.module.ts":
/*!*************************************************!*\
  !*** ./src/app/spice-grid/spice-grid.module.ts ***!
  \*************************************************/
/*! exports provided: SpiceGridPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SpiceGridPageModule", function() { return SpiceGridPageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _spice_grid_routing_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./spice-grid-routing.module */ "./src/app/spice-grid/spice-grid-routing.module.ts");
/* harmony import */ var _spice_grid_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./spice-grid.page */ "./src/app/spice-grid/spice-grid.page.ts");
/* harmony import */ var _spice_spice_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../spice/spice.component */ "./src/app/spice/spice.component.ts");








let SpiceGridPageModule = class SpiceGridPageModule {
};
SpiceGridPageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _ionic_angular__WEBPACK_IMPORTED_MODULE_4__["IonicModule"],
            _spice_grid_routing_module__WEBPACK_IMPORTED_MODULE_5__["SpiceGridPageRoutingModule"]
        ],
        declarations: [_spice_grid_page__WEBPACK_IMPORTED_MODULE_6__["SpiceGridPage"], _spice_spice_component__WEBPACK_IMPORTED_MODULE_7__["SpiceComponent"]]
    })
], SpiceGridPageModule);



/***/ }),

/***/ "./src/app/spice-grid/spice-grid.page.scss":
/*!*************************************************!*\
  !*** ./src/app/spice-grid/spice-grid.page.scss ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#spice-grid {\n  display: grid;\n  grid-template-columns: 146px 146px 146px;\n  grid-template-rows: 146px 146px 146px 146px;\n}\n\nion-col[size=\"6\"] {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: center;\n          justify-content: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy92aW5jZW50L0RvY3VtZW50cy9kZW5pcy1zcGljZXMvY2xpZW50L3NyYy9hcHAvc3BpY2UtZ3JpZC9zcGljZS1ncmlkLnBhZ2Uuc2NzcyIsInNyYy9hcHAvc3BpY2UtZ3JpZC9zcGljZS1ncmlkLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGFBQUE7RUFDQSx3Q0FBQTtFQUNBLDJDQUFBO0FDQ0o7O0FERUE7RUFDSSxvQkFBQTtFQUFBLGFBQUE7RUFDQSx3QkFBQTtVQUFBLHVCQUFBO0FDQ0oiLCJmaWxlIjoic3JjL2FwcC9zcGljZS1ncmlkL3NwaWNlLWdyaWQucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiI3NwaWNlLWdyaWQge1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxNDZweCAxNDZweCAxNDZweDtcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IDE0NnB4IDE0NnB4IDE0NnB4IDE0NnB4O1xufVxuXG5pb24tY29sW3NpemU9XCI2XCJdIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xufSIsIiNzcGljZS1ncmlkIHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxNDZweCAxNDZweCAxNDZweDtcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiAxNDZweCAxNDZweCAxNDZweCAxNDZweDtcbn1cblxuaW9uLWNvbFtzaXplPVwiNlwiXSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/spice-grid/spice-grid.page.ts":
/*!***********************************************!*\
  !*** ./src/app/spice-grid/spice-grid.page.ts ***!
  \***********************************************/
/*! exports provided: SpiceGridPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SpiceGridPage", function() { return SpiceGridPage; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _spice_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../spice.service */ "./src/app/spice.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");





let SpiceGridPage = class SpiceGridPage {
    constructor(service, router) {
        this.service = service;
        this.router = router;
        this.spices = [];
    }
    ngOnInit() {
        this.getSpices();
        this.router.events.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["filter"])(event => event instanceof _angular_router__WEBPACK_IMPORTED_MODULE_3__["NavigationEnd"])).subscribe(() => this.getSpices());
    }
    getSpices() {
        this.service.getAllSpices().subscribe((spices) => {
            // Add new spices
            for (const spice of spices) {
                if (this.spices.find((s) => s.label === spice.label) === undefined) {
                    this.spices.push(spice);
                }
            }
            // Remove deleted spices
            for (let i = this.spices.length - 1; i >= 0; i--) {
                if (spices.find((s) => s.label === this.spices[i].label) === undefined) {
                    this.spices.splice(i, 1);
                }
            }
        });
    }
    goToAddView() {
        this.router.navigateByUrl("/tabs/new");
    }
};
SpiceGridPage.ctorParameters = () => [
    { type: _spice_service__WEBPACK_IMPORTED_MODULE_2__["SpiceService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] }
];
SpiceGridPage = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-spice-grid',
        template: __webpack_require__(/*! raw-loader!./spice-grid.page.html */ "./node_modules/raw-loader/index.js!./src/app/spice-grid/spice-grid.page.html"),
        styles: [__webpack_require__(/*! ./spice-grid.page.scss */ "./src/app/spice-grid/spice-grid.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_spice_service__WEBPACK_IMPORTED_MODULE_2__["SpiceService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
], SpiceGridPage);



/***/ }),

/***/ "./src/app/spice/spice.component.scss":
/*!********************************************!*\
  !*** ./src/app/spice/spice.component.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".container {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n          justify-content: center;\n  height: 144px;\n  width: 144px;\n  border-radius: 100%;\n  cursor: pointer;\n}\n.container:hover {\n  opacity: 80%;\n}\n.container p {\n  font-family: \"Trebuchet MS\", \"Lucida Sans Unicode\", \"Lucida Grande\", \"Lucida Sans\", Arial, sans-serif;\n  font-weight: 500;\n  text-align: center;\n  margin-bottom: 4px;\n  max-width: 120px;\n}\n.container img {\n  width: 60px;\n  border-radius: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy92aW5jZW50L0RvY3VtZW50cy9kZW5pcy1zcGljZXMvY2xpZW50L3NyYy9hcHAvc3BpY2Uvc3BpY2UuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL3NwaWNlL3NwaWNlLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksb0JBQUE7RUFBQSxhQUFBO0VBQ0EsNEJBQUE7RUFBQSw2QkFBQTtVQUFBLHNCQUFBO0VBQ0EseUJBQUE7VUFBQSxtQkFBQTtFQUNBLHdCQUFBO1VBQUEsdUJBQUE7RUFDQSxhQUFBO0VBQ0EsWUFBQTtFQUNBLG1CQUFBO0VBQ0EsZUFBQTtBQ0NKO0FEQ0k7RUFDSSxZQUFBO0FDQ1I7QURFSTtFQUNJLHFHQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7QUNBUjtBREdJO0VBQ0ksV0FBQTtFQUNBLG1CQUFBO0FDRFIiLCJmaWxlIjoic3JjL2FwcC9zcGljZS9zcGljZS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jb250YWluZXIge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGhlaWdodDogMTQ0cHg7XG4gICAgd2lkdGg6IDE0NHB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuXG4gICAgJjpob3ZlciB7XG4gICAgICAgIG9wYWNpdHk6IDgwJTtcbiAgICB9XG5cbiAgICBwIHtcbiAgICAgICAgZm9udC1mYW1pbHk6ICdUcmVidWNoZXQgTVMnLCAnTHVjaWRhIFNhbnMgVW5pY29kZScsICdMdWNpZGEgR3JhbmRlJywgJ0x1Y2lkYSBTYW5zJywgQXJpYWwsIHNhbnMtc2VyaWY7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogNHB4O1xuICAgICAgICBtYXgtd2lkdGg6IDEyMHB4O1xuICAgIH1cblxuICAgIGltZyB7XG4gICAgICAgIHdpZHRoOiA2MHB4O1xuICAgICAgICBib3JkZXItcmFkaXVzOiAxMDAlO1xuICAgIH1cbn1cbiIsIi5jb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgaGVpZ2h0OiAxNDRweDtcbiAgd2lkdGg6IDE0NHB4O1xuICBib3JkZXItcmFkaXVzOiAxMDAlO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG4uY29udGFpbmVyOmhvdmVyIHtcbiAgb3BhY2l0eTogODAlO1xufVxuLmNvbnRhaW5lciBwIHtcbiAgZm9udC1mYW1pbHk6IFwiVHJlYnVjaGV0IE1TXCIsIFwiTHVjaWRhIFNhbnMgVW5pY29kZVwiLCBcIkx1Y2lkYSBHcmFuZGVcIiwgXCJMdWNpZGEgU2Fuc1wiLCBBcmlhbCwgc2Fucy1zZXJpZjtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBtYXJnaW4tYm90dG9tOiA0cHg7XG4gIG1heC13aWR0aDogMTIwcHg7XG59XG4uY29udGFpbmVyIGltZyB7XG4gIHdpZHRoOiA2MHB4O1xuICBib3JkZXItcmFkaXVzOiAxMDAlO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/spice/spice.component.ts":
/*!******************************************!*\
  !*** ./src/app/spice/spice.component.ts ***!
  \******************************************/
/*! exports provided: SpiceComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SpiceComponent", function() { return SpiceComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _spice_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../spice.service */ "./src/app/spice.service.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");





let SpiceComponent = class SpiceComponent {
    constructor(service, alertCtrl) {
        this.service = service;
        this.alertCtrl = alertCtrl;
        this.imageSource = "-1";
        this.editEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    ngOnInit() {
        this.service.getImageForSpice(this.label).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["first"])()).subscribe((source) => this.imageSource = source);
    }
    showAlert() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const alert = yield this.alertCtrl.create({
                header: 'Modifier',
                subHeader: this.label + ' (' + this.type.label + ')',
                inputs: [{
                        name: 'label',
                        type: 'text',
                        value: this.label,
                    }],
                buttons: [
                    {
                        text: 'SUPPRIMER',
                        handler: () => {
                            this.showDeleteConfirm();
                        }
                    }, {
                        text: 'OK',
                        handler: (data) => {
                            this.service.updateSpice(this.label, data.label).subscribe(() => this.editEvent.emit());
                        }
                    }
                ]
            });
            yield alert.present();
        });
    }
    showDeleteConfirm() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const modal = yield this.alertCtrl.create({
                header: 'Supprimer',
                subHeader: this.label + '?',
                buttons: [
                    {
                        text: 'NON',
                    }, {
                        text: 'OUI',
                        handler: () => {
                            this.service.deleteSpice(this.label).subscribe(() => this.editEvent.emit());
                        }
                    }
                ]
            });
            modal.present();
        });
    }
};
SpiceComponent.ctorParameters = () => [
    { type: _spice_service__WEBPACK_IMPORTED_MODULE_2__["SpiceService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
], SpiceComponent.prototype, "label", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], SpiceComponent.prototype, "type", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
], SpiceComponent.prototype, "editEvent", void 0);
SpiceComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-spice',
        template: __webpack_require__(/*! raw-loader!./spice.component.html */ "./node_modules/raw-loader/index.js!./src/app/spice/spice.component.html"),
        styles: [__webpack_require__(/*! ./spice.component.scss */ "./src/app/spice/spice.component.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_spice_service__WEBPACK_IMPORTED_MODULE_2__["SpiceService"], _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"]])
], SpiceComponent);



/***/ })

}]);
//# sourceMappingURL=spice-grid-spice-grid-module-es2015.js.map