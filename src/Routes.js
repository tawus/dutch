import { Switch, Route } from 'react-router-dom';
import Groups from './features/groups/Groups';

const Routes = () => (
    <Switch>
        <Route path="/" component={Groups} />
    </Switch>
);

export default Routes;
