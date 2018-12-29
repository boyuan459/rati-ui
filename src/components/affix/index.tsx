import * as PropTypes from 'prop-types';
import * as React from 'react';
import getScroll from '../_util/getScroll';

export interface AffixProps {
    offsetTop?: number;
    /** The target listen to the scroll event */
    target?: () => Window | HTMLElement | null;
}

export interface AffixState {
    affixStyle: React.CSSProperties | undefined;
}

function getDefaultTarget() {
    return typeof window !== 'undefined' ? window : null;
}

function getTargetRect(target: HTMLElement | Window | null) : ClientRect {
    return target !== window 
        ? (target as HTMLElement).getBoundingClientRect()
        : ({top: 0, left: 0, bottom: 0} as ClientRect);
}

function getOffset(element: HTMLElement, target: HTMLElement | Window | null) {
    const elemRect = element.getBoundingClientRect();
    const targetRect = getTargetRect(target);
    console.log(elemRect, targetRect);
    const scrollTop = getScroll(target, true);
    const scrollLeft = getScroll(target, false);

    const docElem = window.document.body;
    const clientTop = docElem.clientTop;
    const clientLeft = docElem.clientLeft;

    return {
        top: elemRect.top - targetRect.top + scrollTop - clientTop,
        left: elemRect.left - targetRect.left + scrollLeft - clientLeft
    };
}

export default class Affix extends React.Component<AffixProps, AffixState> {
    static propTypes = {
        offsetTop: PropTypes.number,
        target: PropTypes.func,
    };

    state: AffixState = {
        affixStyle: undefined
    }

    private fixNode: HTMLElement;

    componentDidMount() {
        const { offsetTop = 10, target = getDefaultTarget } = this.props;
        const targetEle = target();
        const left = getOffset(this.fixNode, targetEle).left;
        window.onscroll = () => {
            const scrollTop = getScroll(targetEle, true);
            console.log(scrollTop);
            if (scrollTop >= offsetTop) {
                this.setState({
                    affixStyle: {
                        position: 'fixed', 
                        top: offsetTop,
                        left
                    }
                });
            } else {
                this.setState({
                    affixStyle: undefined
                });
            }
        }
    }

    saveFixNode = (node: HTMLDivElement) => {
        this.fixNode = node;
    }

    render() {
        return (
            <div ref={this.saveFixNode} style={this.state.affixStyle}>Affix</div>
        );
    }
}