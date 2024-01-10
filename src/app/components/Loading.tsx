export const Loading = () => {
    return (
        <>
            <div className="mockup-code">
                <pre data-prefix="~" className="text-info"><code>Hi there, and welcome !</code></pre>
                <pre data-prefix="~"><code>Movie trends is a web application from a scrapping project</code></pre>
                <pre data-prefix="~"><code>showcasing the real trend of US cinema releases of the week</code></pre>
                <pre data-prefix="~"><code>scrapping different websites dedicated to cinema.</code></pre>
                <pre data-prefix="~"><code>Wait a few seconds, it should be scrapped soon :</code></pre>
                <pre data-prefix="$" className="text-success"><code>npm start movietrends</code></pre>
                <pre data-prefix=">" className="text-warning"><code>scrapping <span className="loading loading-ball loading-sm"></span><span className="loading loading-ball loading-sm"></span><span className="loading loading-ball loading-sm"></span></code></pre>
            </div>
        </>
    )
}