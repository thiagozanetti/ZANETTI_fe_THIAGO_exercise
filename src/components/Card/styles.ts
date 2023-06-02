import styled from 'styled-components';

interface Props {
    hasNavigation: boolean;
}

export const Container = styled.div<Props>`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    border: 1px solid black;
    background: #ddd;
    padding: 20px;
    width: 250px;
    height: 40px;
    cursor: ${(props: Props) => (props.hasNavigation ? 'pointer' : 'default')};
    margin: 5px;
`;
