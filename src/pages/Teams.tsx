import {ListItem, Team} from 'types';
import {useFetchTeamsQuery} from 'state/slices/team';
import {useAppDispatch} from 'state/hooks';
import {setHeader} from 'state/slices/header';
import List from 'components/List';
import {Container} from 'components/GlobalComponents';

const MapT = (teams: Team[]) => {
    return teams.map(team => {
        const columns = [
            {
                key: 'Name',
                value: team.name,
            },
        ];
        return {
            id: team.id,
            url: `/team/${team.id}`,
            columns,
            navigationProps: team,
        } as ListItem;
    });
};

const Teams = () => {
    const dispatch = useAppDispatch();

    dispatch(setHeader({title: 'Teams', showBackButton: false}));

    const {data: teams = [], isFetching} = useFetchTeamsQuery();

    return (
        <Container>
            <List items={MapT(teams)} isLoading={isFetching} />
        </Container>
    );
};

export default Teams;
