import {SpectronRenderer} from '../../js/test/SpectronRenderer';
import Split from 'split.js';

SpectronRenderer.run(async () => {

    const split = Split(['#three', '#four'], {
        sizes: [50, 50],
        minSize: 100,
        gutterSize: 7,

        elementStyle: (dimension: 'width' | 'height', elementSize: number, gutterSize: number) => {
            return {
                width: `${elementSize}%`
            };
        },

        onDragStart: () => {
            console.log("onDragStart");
        },
        onDragEnd: () => {
            console.log("onDragEnd");

        },
        onDrag: () => {
            console.log("onDrag: " + JSON.stringify(split.getSizes()));

            //document.getElementById("#three");

        }
    });

    // this will collapse it:
    // split.collapse(1);

});

