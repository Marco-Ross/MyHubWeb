import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Container, Engine, MoveDirection, OutMode } from 'tsparticles-engine';
import { loadSlim } from "tsparticles-slim";


@Component({
    selector: 'about',
    templateUrl: 'about.component.html',
    styleUrls: ['about.component.scss']
})
export class AboutComponent
{
    constructor(private formBuilder: FormBuilder) { }

    //

    aboutFG!: FormGroup;

    ngOnInit()
    {
        this.aboutFG = this.formBuilder.group({
        });
    }

    //////


    id = "tsparticles";

    /* or the classic JavaScript object */
    particlesOptions = {
        fullScreen:{
            // enable: true,
            zIndex: -1
        },
        background: {
            // color: {
            //     value: "transparent",
            // },
        },
        fpsLimit: 60,
        interactivity: {
            events: {
                // onClick: {
                //     enable: true,
                //     mode: ClickMode.push,
                // },
                // onHover: {
                //     enable: true,
                //     mode: HoverMode.repulse,
                // },
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
        // console.log(engine);

        // Starting from 1.19.0 you can add custom presets or shape here, using the current tsParticles instance (main)
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        //await loadFull(engine);
        await loadSlim(engine);
    }

}