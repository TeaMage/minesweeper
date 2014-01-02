class Game {
    public repo: BrickRepository;
    public state: GameState;

    public static _defaultSettings: GameSettings =
    {
        level: GameLevel.Medium,
        size: {
            boardWidth: 10,
            boardHeight: 10
        }
    };

    private _currentSettings : GameSettings;

     constructor(repo : BrickRepository) {
         this.state = GameState.NotStarted;
         this.repo = repo;
     }

    public setup(settings?: GameSettings): void {
        
        this._currentSettings = settings || Game._defaultSettings;

        this.repo.removeAllBricks();

        var newBricks = GameSetupHelper.createBricks(this._currentSettings.size);

        // Create bombs
        var numberOfBombs = this.getBombCount(this._currentSettings);
        GameSetupHelper.addBombs(newBricks, numberOfBombs);


        newBricks.forEach(row=>
            row.forEach(brick=>
                GameSetupHelper.setNeighbourCountFor(brick)
            )
        );


        this.state = GameState.Ready;
    }

    private getBombCount (settings: GameSettings) : number {
        var numberOfBricks = settings.size.boardHeight * settings.size.boardWidth;
        var gameLevelFactor: number;

        switch (settings.level) {
            case GameLevel.Easy:
                gameLevelFactor = 0.1;
                break;
            case GameLevel.Medium:
                gameLevelFactor = 0.3;
                break;
            case GameLevel.Hard:
                gameLevelFactor = 0.4;
                break;
            default:
                gameLevelFactor = 0.1;
                break;
        }

        return Math.round(numberOfBricks * gameLevelFactor);
    }
} 