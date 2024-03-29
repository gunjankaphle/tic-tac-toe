import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import './bootstrap.min.css';
import {Button} from 'react-bootstrap';


function Square(props) {
    return (
        <button className="square" onClick = { props.onClick }>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    renderSquare(i) {
        return <Square value={this.props.squares[i]}
                       onClick={() => this.props.onClick(i)}/>;
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            history: [{
                squares: Array(9).fill(null)
                }
            ],
            stepNumber: 0,
            xIsNext: true,
            doneStatus: false
        };
        
    }

    updateDoneStatus = () => {
        this.setState({
            doneStatus: true
        })
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[this.state.stepNumber]
        const squares = current.squares.slice()
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares [i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        })
    }

    refreshPage = () => {
        this.setState({
            history: [{
                squares: Array(9).fill(null)
                }
            ],
            stepNumber: 0,
            xIsNext: true,
            doneStatus: false,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[history.length - 1]
        const winner = calculateWinner(current.squares);
        let finishedStatus = false;

        let status;
        if (winner) {
            finishedStatus = true;
            status = 'Winner: ' + winner;
        }
        else if (!current.squares.includes(null)) {
            finishedStatus = true;
            status = 'Game Tie';
        }
        else {
            status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div>
                <div className="jumbotron">
                    <h3>tic tac toe</h3>
                </div>
                <div className="game">
                    <div className="game-info">
                        <div><h4>{status}</h4></div>
                    </div>
                    <div className="game-board">
                        <Board 
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}/>
                    </div>
                    
                    <div className="btn">
                        {finishedStatus ? <Button type="button"  onClick={this.refreshPage}>Refresh</Button> : <br></br>}
                    </div>
                </div>
            </div>
        )
    }
}

function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }


ReactDOM.render(<Game />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
