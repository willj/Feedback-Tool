import React from 'react';
import ProjectPage from './components/project/ProjectPage';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ProjectViewer from './components/viewer/ProjectViewer';
import './App.css';

const App = () => {
    return (
        <React.Fragment>
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <Switch>
                    <Route exact path="/" component={ProjectPage} />
                    
                    <Route path="/view/gallery/:id" render={({match}) =>
                        <ProjectViewer projectId={match.params.id} viewType="gallery" />
                    } />

                    <Route path="/view/:id/:itemIndex?" render={({match}) =>
                        <ProjectViewer projectId={match.params.id} index={parseInt(match.params.itemIndex, 10)} viewType="image" />
                    } />
                </Switch>
            </BrowserRouter>
        </React.Fragment>
    );
};

export default App;
