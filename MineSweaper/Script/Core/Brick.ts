///<reference path="BrickType.ts"/>
///<reference path="Coordinate.ts"/>
///<reference path="BrickState.ts"/>

class Brick {
    public type: BrickType;
    public state: BrickState;
    public coordinate : Coordinate
    public adjacentBricks: Array<Brick>;
    
    public numberOfNormalNeighbours : number;
   
    constructor(x?: number, y?: number) {
        this.type = BrickType.Unknown;
        this.state = BrickState.FacingDown;
        this.adjacentBricks = new Array<Brick>();
        this.numberOfNormalNeighbours = 0;

        if (x != undefined && y != undefined) {
            this.coordinate =
            {
                x: x,
                y: y
            };
        }
    }
}