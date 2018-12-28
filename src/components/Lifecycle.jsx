import React from 'react';
import axios from 'axios';

export default class Lifecycle extends React.Component {

    interval = null;

    constructor(props){
        /**
         * El constructor se ejecuta antes del primer render
         * Recibe las props y se usa para:
         * 1) Iniciarlizar el estado, sobre todo si tiene relacion con las props
         * 2) Bindear handlers y funciones al componente en si
         */
        super(props);
        this.state = {
            count: props.initialCount || 0,
            user: false,
            time: new Date().toLocaleTimeString()
        }

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        /**
         * Es llamado despues de que el elemento es renderizado por primera vez
         * Es el lugar perfecto para hacer las llamadas asincronicas
         */
        axios.get('http://5bd25dbbbded6100135c3065.mockapi.io/api/employees/1').then(({data}) => this.setState({
            user: data
        }));

        this.interval = setInterval(() => {
            this.setState({
                time: new Date().toLocaleTimeString()
            })
        }, 1000);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        /**
         * Es llamado siempre que un prop o un state cambia su valor
         * podemos utilizarlo para generar cambios en base a comprar
         * los props o state previos con el actual
         */
        console.log('prevProps', prevProps);
        console.log('props', this.props);
        console.log('prevState', prevState);
        console.log('state', this.state);
        if(!prevState.user && this.state.user) {
            console.log('User has been loaded');
        }

        if(prevProps.initialCount !== this.props.initialCount) {
            this.setState({
                count: this.props.initialCount
            })
        }
    }

    componentWillUnmount() {
        /**
         * Corre antes de que el componente sea sacado del DOM
         * Es el momento limpiar cosas. Destruir event listeners
         * y limpiar intervalos por ejemplo
         */
        clearInterval(this.interval);
    }

    handleClick(){
        this.setState(prevState => ({
            count: prevState.count + 1
        }));
    }

    render() {
        /**
         * Es el unico metodo que obligatoriamente deben tener todos los componentes
         * No cambia el estado del componente y solo se encarga de devolver
         * el JSX para luego renderizar
         */
        return (
            <div>
                <h1>Hello React!!</h1>
                <button onClick={this.handleClick}>Click me!</button>
                <p>{this.state.count}</p>
                <p>{this.state.user.name}</p>
                <p>{this.state.time}</p>
            </div>
        )
    }

}