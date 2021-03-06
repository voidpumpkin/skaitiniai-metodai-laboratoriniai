import SkaitiniaiMetodai from '../Helpers/skaitiniaimetodai.js';
import math from '../../node_modules/mathjs/index.js';
import Plotly from '../../lib/plotly.js';
import {
    laboratorinis2Uzd1Data,
    laboratorinis2Uzd2Data,
    laboratorinis2Uzd3Data
} from './laboratorinis_2_data';
class Laboratorinis_2 {
    constructor() {
        this.skaitiniaiMetodai = new SkaitiniaiMetodai();
    }
    onload() {
        let data = laboratorinis2Uzd1Data.map(e => {
            return {
                x: e.Diena,
                y: e.Euribor
            };
        });
        this.drawUzd1NewtonRatiosTable(data);
        this.drawUzd1(data, 'newton');
        this.drawUzd1(data, 'lagrange');
        data = laboratorinis2Uzd2Data.Laikotarpis.map((e, i) => {
            return {
                x: laboratorinis2Uzd2Data.Laikotarpis[i],
                y: laboratorinis2Uzd2Data.DuomenuSrautasMB[i]
            };
        });
        this.drawUzd2(data);
        data = laboratorinis2Uzd3Data.Gylis.map((e, i) => {
            return {
                x: laboratorinis2Uzd3Data.Gylis[i],
                y: laboratorinis2Uzd3Data.Trukme[i]
            };
        });
        this.drawUzd3(data);
    }

    drawUzd1NewtonRatiosTable(data) {
        const drawAtDocument = document.getElementById('uzd1-newton-table');
        let newtonTable = this.skaitiniaiMetodai.calcNewtonRatiosTable(data, data.length - 1);
        newtonTable = newtonTable.map(e => e.map(e => e === '-' ? e : math.round(e, 4)));
        let table = {
            type: 'table',
            header: {
                values: ['x', 'y'].concat(newtonTable.map((e, i) => 'f' + (i + 1)))
            },
            cells: {
                values: [
                    [...data.map(e => e.x)],
                    [...data.map(e => e.y)]
                ].concat(newtonTable.map(e => e))
            }
        };
        Plotly.react(drawAtDocument, [table]);
    }

    drawUzd1(data, methodToUse) {
        let drawAtDocument = null;
        let tableValues = [];
        let x = 2;
        if (methodToUse == 'newton') {
            drawAtDocument = document.getElementById('uzd1-table-newt');
            tableValues.push(this.skaitiniaiMetodai.calcApproximationsUsingNewton(x, data));
        } else {
            drawAtDocument = document.getElementById('uzd1-table-lagr');
            tableValues.push(this.skaitiniaiMetodai.calcApproximationsUsingLagrange(x, data));
        }

        tableValues.unshift(tableValues[0].map((e, i) => i + 1));
        tableValues.push(this.skaitiniaiMetodai.calcRealErrors(tableValues[1], 0.231));
        tableValues.push(this.skaitiniaiMetodai.calcBiases(tableValues[1]));

        let table = {
            type: 'table',
            header: {
                values: ['Eile', 'Artinys', 'Reali paklaida', 'Paklaidos ivertis']
            },
            cells: {
                values: tableValues
            }
        };
        Plotly.react(drawAtDocument, [table]);
    }



    drawUzd2(data) {
        let drawAtDocument = document.getElementById('uzd2-table-lagr');
        let tableValues = [
            []
        ];
        for (let i = 0; i < data.length; i++) {
            let dataSet = '';
            for (let j = 0; j < 4; j++) {
                if (i + j >= data.length) {
                    dataSet += i + j - data.length + 1;
                } else {
                    dataSet += i + j + 1;
                }
            }
            tableValues[0].push(dataSet);
        }
        let x = 3;
        tableValues.push(this.calcUzd2ApproximationValuesLag(x, data));
        let table = {
            type: 'table',
            header: {
                values: ['Duomenu rinkinys', 'Artinys']
            },
            cells: {
                values: tableValues
            }
        };
        Plotly.react(drawAtDocument, [table]);
    }

    calcUzd2ApproximationValuesLag(x, data) {
        let approximationValues = [];
        let points = [];
        for (let i = 0; i < data.length; i++) {
            points = [];
            for (let j = 0; j < 4; j++) {
                if (i + j >= data.length) {
                    points.push(data[i + j - data.length]);
                } else {
                    points.push(data[i + j]);
                }
            }
            approximationValues.push(math.round(this.skaitiniaiMetodai.calcApproximationUsingLagrange(x, 3, points), 4));
        }
        return approximationValues;
    }

    drawUzd3(data) {
        let x = 17;
        let n = 4;

        let pasitikrinimui = this.calcUzd2ApproximationValuesLag(x, data).map(e => e.toString());
        console.info('Lab2Uzd3 all aproximations', pasitikrinimui);
        let bestData = this.pickBestData(x, data, n);
        let drawAtDocument = document.getElementById('uzd3-table-lagr');
        let tableValues = [
            []
        ];
        tableValues[0].push(bestData.reduce((acc, cur) => {
            return (data.indexOf(cur) + 1) + acc;
        }, '').split('').sort().join(''));
        tableValues.push(this.calcUzd3ApproximationValuesLag(x, bestData));
        let table = {
            type: 'table',
            header: {
                values: ['Duomenu rinkinys', 'Artinys']
            },
            cells: {
                values: tableValues
            }
        };
        Plotly.react(drawAtDocument, [table]);
    }

    calcUzd3ApproximationValuesLag(x, data) {
        let approximationValues = [];
        approximationValues.push(math.round(this.skaitiniaiMetodai.calcApproximationUsingLagrange(x, 3, data), 4));
        return approximationValues;
    }

    pickBestData(x, data, n) {
        let bestData = [];
        let xDistArr = data.map(e => math.subtract(x, e.x));
        let xLeftNeighbor = data[xDistArr.indexOf(Math.min(...xDistArr.filter(e => e > 0)))];
        let xRightNeighbor = data[xDistArr.indexOf(Math.max(...xDistArr.filter(e => e < 0)))];
        let middlePoint = math.divide(math.abs(math.subtract(xLeftNeighbor.y, xRightNeighbor.y)), 2);
        middlePoint = math.add(middlePoint, Math.min(xLeftNeighbor.y, xRightNeighbor.y));
        let dataWithDist = data.map(e => {
            return {
                data: e,
                dist: {
                    y: math.abs(math.subtract(middlePoint, e.y))
                }
            };
        });
        dataWithDist = dataWithDist.sort((a, b) => a.dist.y - b.dist.y);
        for (let i = 0; i < n + 1; i++) {
            bestData.push(dataWithDist[i].data);
        }
        return bestData;
    }
}
export default new Laboratorinis_2();