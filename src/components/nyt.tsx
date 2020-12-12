import React, { Component } from 'react';
import NytDisplay from './nytdisplay'

type NytState = {
    search: string,
    page: number,
    startDate: string | number,
    endDate: string | number,
    nytResponse: any
}

export default class Nyt extends Component<{}, NytState>{
    constructor(props: any) {
        super(props)
        this.state = {
            search: '',
            page: 0,
            startDate: '',
            endDate: '',
            nytResponse: []
        }
    }

    searchFunction(e: any) {
        this.setState({
            search: (e)
        })
    }
    setStartDate(e: any) {
        this.setState({
            startDate: (e)
        })
    }
    setEndDate(e: any) {
        this.setState({
            endDate: (e)
        })
    }

    fetchResults() {
        const key = 'GLO0QqrAAPL3qinAr2rmVnQxBJiG6Qft';
        let baseUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${key}&page=${this.state.page}&q=${this.state.search}`;

        if (this.state.startDate !== '') {
            // console.log(this.state.startDate)
            baseUrl += `&begin_date=${this.state.startDate}`
            console.log(baseUrl)
        }

        if (this.state.endDate !== '') {
            // console.log(this.state.endDate)
            baseUrl += `&end_date=${this.state.endDate}`
            console.log(baseUrl)
        }

        fetch(baseUrl)
            .then(res => res.json())
            .then(data => {
                console.log('response', data.response.docs.length)
                this.setState({
                    nytResponse: data.response.docs
                })
            })

        // console.log(this.state.response)
    }

    handleSubmit(e: any) {
        e.preventDefault()
        this.fetchResults()
    }

    nextPage(e: any){
        e.preventDefault()
        this.setState({
            page: this.state.page+1
        })
        this.fetchResults()
    }

    previousPage(e: any){
        e.preventDefault()
        if(this.state.page > 0) {
        this.setState({
            page: this.state.page-1
        })
        this.fetchResults()
    } else {
        console.log('You are on the first page')
    }
    }

    render() {
        return (
            <div>
                <div>
                    <form onSubmit={(e) => this.handleSubmit(e)} >
                        <label>Search: </label>
                        <input type='text' value={this.state.search} placeholder='Search' onChange={(e) => this.searchFunction(e.target.value)} />
                        <br />
                        <label>Start Date</label>
                        <input type='date' onChange={(e) => this.setStartDate(e.target.value)} />
                        <br />
                        <label>End Date</label>
                        <input type='date' onChange={(e) => this.setEndDate(e.target.value)} />
                        <button type='submit'>Search</button>
                        <hr />
                        <NytDisplay nytResponse={this.state.nytResponse} />
                        <button onClick={(e)=> this.previousPage(e)}>Previous Page</button>
                        <button onClick={(e)=> this.nextPage(e)}>Next Page</button>
                    </form>
                </div>
            </div>
        )
    }
}