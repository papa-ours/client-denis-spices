(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tab1-tab1-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/spice-item/spice-item.component.html":
/*!********************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/spice-item/spice-item.component.html ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-item-sliding>\n  <ion-item>\n    <ion-label>{{label}}</ion-label>\n    <ion-label>{{type.label}}</ion-label>\n    <ion-thumbnail *ngIf=\"imageSource !== '-1'; else loader\" slot=\"end\">\n      <img src={{imageSource}}/>\n    </ion-thumbnail>\n    <ng-template #loader>\n      <ion-spinner name=\"circular\"></ion-spinner>\n    </ng-template>\n  </ion-item>\n  <ion-item-options side=\"start\">\n    <ion-item-option (click)=\"showEditAlert()\">Modifier</ion-item-option>\n  </ion-item-options>\n\n  <ion-item-options side=\"end\">\n    <ion-item-option color=\"danger\" (click)=\"showDeleteConfirm()\">Supprimer</ion-item-option>\n  </ion-item-options>\n</ion-item-sliding>"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/tab1/tab1.page.html":
/*!***************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/tab1/tab1.page.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-content>\n  <ion-grid fixed *ngIf=\"spices.length; else noSpices\">\n    <ion-row>\n      <ion-col size=\"2\"></ion-col>\n      <ion-col size=\"8\">\n        <ion-list>\n          <ion-list>\n            <app-spice-item *ngFor=\"let spice of spices\" [label]=\"spice.label\" [type]=\"spice.type\" (editEvent)=\"getSpices()\">\n            </app-spice-item>\n          </ion-list>\n        </ion-list>\n      </ion-col>\n      <ion-col size=\"2\"></ion-col>\n    </ion-row>\n  </ion-grid>\n\n  <ng-template #noSpices>\n    <ion-header>\n      <ion-toolbar>\n        <ion-title color=\"danger\">\n          Il n'y a aucune épice\n          <ion-button class=\"ion-float-right\" (click)=\"goToAddView()\">\n            <ion-icon name=\"add-circle\"></ion-icon>\n            AJOUTER\n          </ion-button>\n        </ion-title>\n      </ion-toolbar>\n    </ion-header>\n  </ng-template>\n\n</ion-content>\n"

/***/ }),

/***/ "./src/app/spice-item/spice-item.component.scss":
/*!******************************************************!*\
  !*** ./src/app/spice-item/spice-item.component.scss ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "ion-item item-label {\n  width: 300px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy92aW5jZW50L0RvY3VtZW50cy9kZW5pcy1zcGljZXMvY2xpZW50L3NyYy9hcHAvc3BpY2UtaXRlbS9zcGljZS1pdGVtLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9zcGljZS1pdGVtL3NwaWNlLWl0ZW0uY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxZQUFBO0FDQ0oiLCJmaWxlIjoic3JjL2FwcC9zcGljZS1pdGVtL3NwaWNlLWl0ZW0uY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJpb24taXRlbSBpdGVtLWxhYmVsIHtcbiAgICB3aWR0aDogMzAwcHg7XG59IiwiaW9uLWl0ZW0gaXRlbS1sYWJlbCB7XG4gIHdpZHRoOiAzMDBweDtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/spice-item/spice-item.component.ts":
/*!****************************************************!*\
  !*** ./src/app/spice-item/spice-item.component.ts ***!
  \****************************************************/
/*! exports provided: SpiceItemComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SpiceItemComponent", function() { return SpiceItemComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _spice_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../spice.service */ "./src/app/spice.service.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");





let SpiceItemComponent = class SpiceItemComponent {
    constructor(service, alertCtrl) {
        this.service = service;
        this.alertCtrl = alertCtrl;
        this.imageSource = "-1";
        this.editEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    ngOnInit() {
        this.service.getImageForSpice(this.label).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["first"])()).subscribe((source) => this.imageSource = source);
    }
    showEditAlert() {
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
                        text: 'Annuler',
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
SpiceItemComponent.ctorParameters = () => [
    { type: _spice_service__WEBPACK_IMPORTED_MODULE_2__["SpiceService"] },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"] }
];
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
], SpiceItemComponent.prototype, "label", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
], SpiceItemComponent.prototype, "type", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
], SpiceItemComponent.prototype, "editEvent", void 0);
SpiceItemComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-spice-item',
        template: __webpack_require__(/*! raw-loader!./spice-item.component.html */ "./node_modules/raw-loader/index.js!./src/app/spice-item/spice-item.component.html"),
        styles: [__webpack_require__(/*! ./spice-item.component.scss */ "./src/app/spice-item/spice-item.component.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_spice_service__WEBPACK_IMPORTED_MODULE_2__["SpiceService"], _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["AlertController"]])
], SpiceItemComponent);



/***/ }),

/***/ "./src/app/tab1/tab1.module.ts":
/*!*************************************!*\
  !*** ./src/app/tab1/tab1.module.ts ***!
  \*************************************/
/*! exports provided: Tab1PageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tab1PageModule", function() { return Tab1PageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _tab1_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./tab1.page */ "./src/app/tab1/tab1.page.ts");
/* harmony import */ var _spice_item_spice_item_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../spice-item/spice-item.component */ "./src/app/spice-item/spice-item.component.ts");








let Tab1PageModule = class Tab1PageModule {
};
Tab1PageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"])({
        imports: [
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["IonicModule"],
            _angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild([{ path: '', component: _tab1_page__WEBPACK_IMPORTED_MODULE_6__["Tab1Page"] }]),
        ],
        declarations: [_tab1_page__WEBPACK_IMPORTED_MODULE_6__["Tab1Page"], _spice_item_spice_item_component__WEBPACK_IMPORTED_MODULE_7__["SpiceItemComponent"]]
    })
], Tab1PageModule);



/***/ }),

/***/ "./src/app/tab1/tab1.page.scss":
/*!*************************************!*\
  !*** ./src/app/tab1/tab1.page.scss ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".table-header {\n  width: 300px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy92aW5jZW50L0RvY3VtZW50cy9kZW5pcy1zcGljZXMvY2xpZW50L3NyYy9hcHAvdGFiMS90YWIxLnBhZ2Uuc2NzcyIsInNyYy9hcHAvdGFiMS90YWIxLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFlBQUE7QUNDRiIsImZpbGUiOiJzcmMvYXBwL3RhYjEvdGFiMS5wYWdlLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIudGFibGUtaGVhZGVyIHtcbiAgd2lkdGg6IDMwMHB4O1xufSIsIi50YWJsZS1oZWFkZXIge1xuICB3aWR0aDogMzAwcHg7XG59Il19 */"

/***/ }),

/***/ "./src/app/tab1/tab1.page.ts":
/*!***********************************!*\
  !*** ./src/app/tab1/tab1.page.ts ***!
  \***********************************/
/*! exports provided: Tab1Page */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tab1Page", function() { return Tab1Page; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _spice_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../spice.service */ "./src/app/spice.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");





let Tab1Page = class Tab1Page {
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
Tab1Page.ctorParameters = () => [
    { type: _spice_service__WEBPACK_IMPORTED_MODULE_2__["SpiceService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] }
];
Tab1Page = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-tab1',
        template: __webpack_require__(/*! raw-loader!./tab1.page.html */ "./node_modules/raw-loader/index.js!./src/app/tab1/tab1.page.html"),
        styles: [__webpack_require__(/*! ./tab1.page.scss */ "./src/app/tab1/tab1.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_spice_service__WEBPACK_IMPORTED_MODULE_2__["SpiceService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
], Tab1Page);



/***/ })

}]);
//# sourceMappingURL=tab1-tab1-module-es2015.js.map