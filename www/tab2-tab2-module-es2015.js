(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tab2-tab2-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/tab2/tab2.page.html":
/*!***************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/tab2/tab2.page.html ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ion-content>\n  <ion-grid fixed>\n    <ion-row>\n      <ion-col size=\"3\"></ion-col>\n      <ion-col size=\"6\">\n        <form (ngSubmit)=\"onSubmit()\">  \n\n          <ion-list>\n            <ion-item>\n              <ion-label position=\"stacked\">Nom</ion-label>\n              <ion-input name=\"label\" [value]=\"spice.label\" type=\"text\" placeholder=\"Entrer le nom de l'épice\" (ionChange)=\"updateLabel($event)\"></ion-input>\n            </ion-item>\n        \n            <ion-list>\n              <ion-list-header>\n                <ion-label>Type</ion-label>\n              </ion-list-header>\n              <ion-radio-group name=\"type\" [value]=\"spice.type\" (ionChange)=\"updateType($event)\">\n                <ion-item *ngFor=\"let type of spiceTypes; let ind=index\">\n                  <ion-label>{{type.label}}</ion-label>\n                  <ion-radio slot=\"start\" [value]=\"ind\"></ion-radio>\n                </ion-item>\n              </ion-radio-group>\n            </ion-list>\n          </ion-list>\n          <ion-grid fixed>\n            <ion-row>\n              <ion-col size=\"3\">\n                <ion-button color=\"primary\" type=\"submit\">\n                  Continuer\n                </ion-button>\n              </ion-col>\n              <ion-col size=\"3\">\n                <ion-button color=\"primary\" (click)=\"onSubmit(true)\">\n                  Soumettre\n                </ion-button>\n              </ion-col>\n            </ion-row>\n          </ion-grid>\n        </form>\n      </ion-col>\n      <ion-col size=\"3\"></ion-col>\n    </ion-row>\n  </ion-grid>\n\n</ion-content>\n"

/***/ }),

/***/ "./src/app/tab2/tab2.module.ts":
/*!*************************************!*\
  !*** ./src/app/tab2/tab2.module.ts ***!
  \*************************************/
/*! exports provided: Tab2PageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tab2PageModule", function() { return Tab2PageModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _tab2_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./tab2.page */ "./src/app/tab2/tab2.page.ts");







let Tab2PageModule = class Tab2PageModule {
};
Tab2PageModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"])({
        imports: [
            _ionic_angular__WEBPACK_IMPORTED_MODULE_1__["IonicModule"],
            _angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild([{ path: '', component: _tab2_page__WEBPACK_IMPORTED_MODULE_6__["Tab2Page"] }])
        ],
        declarations: [_tab2_page__WEBPACK_IMPORTED_MODULE_6__["Tab2Page"]]
    })
], Tab2PageModule);



/***/ }),

/***/ "./src/app/tab2/tab2.page.scss":
/*!*************************************!*\
  !*** ./src/app/tab2/tab2.page.scss ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3RhYjIvdGFiMi5wYWdlLnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/tab2/tab2.page.ts":
/*!***********************************!*\
  !*** ./src/app/tab2/tab2.page.ts ***!
  \***********************************/
/*! exports provided: Tab2Page */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tab2Page", function() { return Tab2Page; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _spice_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../spice-types */ "./src/app/spice-types.ts");
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ "./node_modules/@ionic/angular/dist/fesm5.js");
/* harmony import */ var _spice_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../spice.service */ "./src/app/spice.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");






let Tab2Page = class Tab2Page {
    constructor(toastController, service, router) {
        this.toastController = toastController;
        this.service = service;
        this.router = router;
        this.spiceTypes = _spice_types__WEBPACK_IMPORTED_MODULE_2__["SPICE_TYPES"];
        this.spice = {
            label: "",
            type: 0,
        };
    }
    showToast() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            const toast = yield this.toastController.create({
                message: 'Le nom ne doit pas être vide',
                duration: 2200,
                position: 'bottom',
                color: 'danger',
                showCloseButton: true,
                closeButtonText: 'OK',
            });
            toast.present();
        });
    }
    onSubmit(changeView = false) {
        if (this.spice.label === "") {
            this.showToast();
            return;
        }
        this.service.createSpice(this.spice).subscribe(() => tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            this.service.getAllSpices();
            this.spice = {
                label: "",
                type: 0,
            };
            if (changeView) {
                this.router.navigateByUrl("/tabs/all");
            }
            else {
                const toast = yield this.toastController.create({
                    message: 'Épice ajoutée',
                    duration: 2200,
                    position: 'bottom',
                    color: 'success',
                    showCloseButton: true,
                    closeButtonText: 'OK',
                });
                toast.present();
            }
        }));
    }
    updateLabel($event) {
        this.spice.label = $event.detail.value;
    }
    updateType($event) {
        this.spice.type = $event.detail.value;
    }
};
Tab2Page.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ToastController"] },
    { type: _spice_service__WEBPACK_IMPORTED_MODULE_4__["SpiceService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"] }
];
Tab2Page = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-tab2',
        template: __webpack_require__(/*! raw-loader!./tab2.page.html */ "./node_modules/raw-loader/index.js!./src/app/tab2/tab2.page.html"),
        styles: [__webpack_require__(/*! ./tab2.page.scss */ "./src/app/tab2/tab2.page.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_ionic_angular__WEBPACK_IMPORTED_MODULE_3__["ToastController"], _spice_service__WEBPACK_IMPORTED_MODULE_4__["SpiceService"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"]])
], Tab2Page);



/***/ })

}]);
//# sourceMappingURL=tab2-tab2-module-es2015.js.map