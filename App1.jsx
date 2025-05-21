import React, { Component } from 'react';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

class DataFetcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      filteredData: [],
      searchQuery: '',
      error: null,
      loading: false,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    this.setState({ loading: true, error: null });
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      this.setState({ data, filteredData: data, loading: false });
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.filterData();
    }
  }

  handleSearchChange = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  filterData = () => {
    const { data, searchQuery } = this.state;
    if (searchQuery.trim() === '') {
      this.setState({ filteredData: data });
    } else {
      const filteredData = data.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      this.setState({ filteredData });
    }
  };

  renderError = () => {
    const { error } = this.state;
    return error ? <div className="error">{`Error: ${error}`}</div> : null;
  };

  render() {
    const { filteredData, searchQuery, loading } = this.state;

    return (
      <div className="flex justify-center flex-col items-center min-h-screen">
        <h1 className='text-2xl  font-bold underline mb-4 '>User Data</h1>

        {this.renderError()}

        <div className="border-2 border-black text-2xl font-bold mb-4">
          <input
          className='text-2xl font-bold w-[450px]'
            type="text"
            value={searchQuery}
            onChange={this.handleSearchChange}
            placeholder="Search by name"
          />
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <table>
            <thead>
              <tr className='text-xl underline border'>
                <th className='border p-4'>Name</th>
                <th className='border p-4'>Email</th>
                <th className='border p-4'>City</th>
              </tr>
            </thead>
            <tbody >
              {filteredData.length > 0 && (
                filteredData.map((item) => (
                  <tr className='border' key={item.id}>
                    <td className='border p-4'>{item.name}</td>
                    <td className='border p-4'>{item.email}</td>
                    <td className='border p-4'>{item.address.city}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}

        <button className='cursor-pointer bg-cyan-400 mt-5 w-[150px] h-[50px] rounded-4xl font-bold text-xl' onClick={this.fetchData}>Refresh Data</button>
      </div>
    );
  }
}

export default DataFetcher;