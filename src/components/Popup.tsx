import { useEffect } from 'react';
import styled from 'styled-components'

interface PopupProps {
    element: JSX.Element;
    onClickOutside?: () => any;
    onKeyboardEsc?: () => any;
}

const Popup = (props: PopupProps) => {
    const { onKeyboardEsc } = props;

    // register a listener for the escape key
    useEffect(() => {
        const escPressHandler = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                event.preventDefault();
                onKeyboardEsc?.();
            }
        };

        document.addEventListener('keydown', escPressHandler);

        // when the page is unloaded, remove the listener
        // (whatever is returned from useEffect is called when the component is unmounted)
        return () => {
            document.removeEventListener('keydown', escPressHandler);
        };
    }, [onKeyboardEsc]);


    return (
        <PopupWrapper>
            <PopupBackdrop onClick={props.onClickOutside} />
            <PopupContentsContainer children={props.element} />
        </PopupWrapper>
    )
}

export default Popup

const PopupBackdrop = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,.5);
    opacity: 1;
    z-index: 100;
`

const PopupWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 101;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const PopupContentsContainer = styled.div`
    max-width: 80vw;
    max-height: 90vh;
    background-color: white;
    border-radius: 15px;
    opacity: 1;
    overflow: auto;
    z-index: 102;
    position: relative;
`