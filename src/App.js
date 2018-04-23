import React from 'react';
import ProjectPage from './components/project/ProjectPage';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ProjectViewer from './components/viewer/ProjectViewer';

class App extends React.Component {
   render() {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Switch>
                <Route exact path="/" component={ProjectPage} />
                <Route path="/view/:id/:itemIndex?" render={({match}) =>
                    <ProjectViewer projectId={match.params.id} index={parseInt(match.params.itemIndex, 10)} />
                } />
            </Switch>
        </BrowserRouter>
    );
  }
}

export default App;
