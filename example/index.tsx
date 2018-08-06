import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Value } from 'slate';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Container, Col } from 'reactstrap';

class Root extends React.PureComponent {
	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
	}

	onChange({ value }: { value: Value }) {
		console.log(JSON.stringify(value.toJSON()));
	}

	render() {
		return (
			<Container>
				<Col sm="12" md={{ size: 8, offset: 2 }}>
					<App onChange={this.onChange} />
				</Col>
			</Container>
		);
	}
}

ReactDOM.render(<Root />, document.getElementById('root'));
