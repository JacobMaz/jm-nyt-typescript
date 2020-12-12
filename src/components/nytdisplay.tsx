import React from 'react';

const NytDisplay = (props: any) => {
    // console.log('props.nytResponse', props.nytResponse[0].multimedia[0].url)
    {props.nytResponse.length > 0 && props.nytResponse.map((doc: any, index: any) => console.log(doc.keywords) )}

    return (
        <div>
            {props.nytResponse.length > 0 && props.nytResponse.map((doc: any, index: any) =>
                <div key={index}>
                    <a href={doc.web_url} target='blank' ><h3>{doc.headline.main}</h3></a>
                    { doc.multimedia.length > 0  ? <img src={`http://www.nytimes.com/${doc.multimedia[0].url}`} alt='no image' /> : <h4>No Image</h4>}
                    { doc.keywords.map((keyword: any) => 
                    <p>{keyword.name}: {keyword.value}</p>)}
                </div>)}
        </div>
    )
}

export default NytDisplay;