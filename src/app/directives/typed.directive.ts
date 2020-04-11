import {Directive, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, Renderer2, SimpleChanges} from '@angular/core';
import Typed from 'typed.js';

export interface IAppTyped {
    typings: string[];
    options?: { [key: string]: string };
}

@Directive({
    selector: '[appTyped]',
})
export class TypedDirective implements OnInit, OnDestroy, OnChanges {

    @Input('appTyped') appTyped: IAppTyped;
    typed: Typed;
    uniqueClass = '';
    initialized = false;

    constructor(private elementRef: ElementRef, private renderer2: Renderer2) {
    }

    ngOnInit(): void {
        this.initialized = true;
        /* generate unique class for element and inject typed into this DOM element */
        this.uniqueClass = 'typed-' + Math.random().toString().replace('.', '-');
        this.renderer2.addClass(this.elementRef.nativeElement, this.uniqueClass);
        this.initializeTyped();
    }

    initializeTyped() {
        /* set options for typed.js */
        const defaultOptions = {
            typeSpeed: 70,
            backSpeed: 40,
            startDelay: 1000,
            showCursor: true,
            cursorChar: '|',
            loop: true
        };

        let options = {
            strings: this.appTyped.typings,
        };

        if (this.appTyped.options) {
            options = {
                ...options,
                ...this.appTyped.options,
            };
        } else {
            options = {
                ...options,
                ...defaultOptions,
            };
        }

        this.typed = new Typed(`.${this.uniqueClass}`, options);
    }

    destroyTyped() {
        if (this.typed) {
            this.typed.destroy();
            this.typed = null;
        }
    }

    ngOnDestroy(): void {
        this.destroyTyped();
    }

    ngOnChanges(changes: SimpleChanges): void {
        /* We have to apply changes only after first initialization, not before one */
        if (this.initialized) {
            this.destroyTyped();
            this.initializeTyped();
        }
    }
}
