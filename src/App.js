import React from 'react';
import ProjectPage from './components/project/ProjectPage';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ProjectViewer from './components/viewer/ProjectViewer';
import './App.css';

const App = () => {
    return (
        <React.Fragment>
            <header>
                <h1 className="app-title">Feedback</h1>
            </header>
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <Switch>
                    <Route exact path="/" component={ProjectPage} />
                    <Route path="/view/:id/:itemIndex?" render={({match}) =>
                        <ProjectViewer projectId={match.params.id} index={parseInt(match.params.itemIndex, 10)} />
                    } />
                </Switch>
            </BrowserRouter>
        </React.Fragment>
    );
};

export default App;
