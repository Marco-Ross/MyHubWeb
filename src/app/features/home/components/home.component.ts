import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Container, Engine, MoveDirection, OutMode } from 'tsparticles-engine';
import { loadSlim } from "tsparticles-slim";
import { faClipboardCheck, faImage, faBezierCurve, faLightbulb } from '@fortawesome/free-solid-svg-icons';


@Component({
    selector: 'home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.scss']
})
export class HomeComponent
{
    constructor(private formBuilder: FormBuilder) { }

    faClipboardCheck = faClipboardCheck;
    faImage = faImage;
    faBezierCurve = faBezierCurve;
    faLightbulb = faLightbulb;

    //

    homeFG!: FormGroup;

    ngOnInit()
    {
        this.homeFG = this.formBuilder.group({});
    }

    //////

    id = "tsparticles";

    particlesOptions = {
        fullScreen: {

            zIndex: -1
        },
        fpsLimit: 60,
        interactivity: {
            events: {
                resize: true,
            },
            modes: {
                push: {
                    quantity: 4,
                },
                repulse: {
                    distance: 200,
                    duration: 0.4,
                },
            },
        },
        particles: {
            color: {
                value: "#4c4c4c",
            },
            links: {
                color: "#4c4c4c",
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1,
            },
            move: {
                direction: MoveDirection.none,
                enable: true,
                outModes: {
                    default: OutMode.bounce,
                },
                random: false,
                speed: 2,
                straight: false,
            },
            number: {
                density: {
                    enable: true,
                    area: 800,
                },
                value: 80,
            },
            opacity: {
                value: 0.5,
            },
            shape: {
                type: "circle",
            },
            size: {
                value: { min: 1, max: 5 },
            },
        },
        detectRetina: true,
    };

    particlesLoaded(container: Container): void
    {
        // console.log(container);
    }

    async particlesInit(engine: Engine): Promise<void>
    {
        await loadSlim(engine);
    }

}