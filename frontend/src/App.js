import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './views/Home';
import CalculatorView from './views/CalculatorView';
import DarkHuntersRPGView from './views/DarkHuntersRPGView';
import ArrowUnitView from './views/ArrowUnitView';
import OnQEntertainmentView from './views/OnQEntertainmentView';

const App = () => {
    return (
        <Router>
            <Header />
            <Sidebar />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/calculator" component={CalculatorView} />
                <Route path="/dark-hunters-rpg" component={DarkHuntersRPGView} />
                <Route path="/arrow-unit" component={ArrowUnitView} />
                <Route path="/on-q-entertainment" component={OnQEntertainmentView} />
            </Switch>
        </Router>
    );
};

export default App;
