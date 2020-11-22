import React from "react";

export default function withDataFetching(WrappedComponent) {
  class WithDataFetching extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        loading: true,
        data: [],
        error: "",
      };

      //   console.log(props);
    }

    async componentDidMount() {
      try {
        const data = await fetch(this.props.dataSource);
        // console.log(this.props);
        const dataJson = await data.json();

        if (dataJson) {
          this.setState({
            data: dataJson,
            loading: false,
          });
        }
      } catch (error) {
        this.setState({
          error: error.message,
          loading: false,
        });
      }
    }

    render() {
      const { data, loading, error } = this.state;
      return (
        <WrappedComponent
          data={data}
          loading={loading}
          error={error}
          {...this.props}
        />
      );
    }
  }
  WithDataFetching.displayName = `WithDataFetching(${WrappedComponent.name})`;
  return WithDataFetching;
}
