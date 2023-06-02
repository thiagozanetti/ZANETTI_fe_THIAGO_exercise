import {useNavigate} from 'react-router-dom';
import {useAppSelector} from 'state/hooks';
import {HeaderContainer, NavigationHeader, BackButton, Title, BackButtonContainer} from './styles';

const Header = () => {
    const navigate = useNavigate();
    const {title, showBackButton} = useAppSelector(({header}) => header);

    return (
        <HeaderContainer>
            <NavigationHeader>
                <BackButtonContainer>
                    {showBackButton && (
                        <BackButton
                            onClick={() => {
                                navigate(-1);
                            }}
                        >
                            🔙
                        </BackButton>
                    )}
                </BackButtonContainer>
                <Title>{title}</Title>
            </NavigationHeader>
        </HeaderContainer>
    );
};

export default Header;
