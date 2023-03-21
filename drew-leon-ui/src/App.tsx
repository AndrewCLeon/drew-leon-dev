import './App.scss';

function App() {
  return (
    <>
      <div className="under-construction">
        <a href="https://github.com/AndrewCLeon/drew-leon-dev">
          <img
            alt="Website is under construction"
            data-testid="website-under-construction-image"
            src={"./images/under-construction.jpg"}
          />
        </a>
        <div>
          <label>TODO List</label>
          <ul>
            <li>
              Domain
              <ul>
                <li className="strike-through">Purchase domain</li>
                <li className="strike-through">Transfer Domain</li>
                <li className="strike-through">Initial Deployment</li>
              </ul>
            </li>
            <li>
              Infrastructure
              <ul>
                <li className="strike-through">CDK Configuration</li>
                <li className="strike-through">Bucket</li>
                <li className="strike-through">SSL Certificate</li>
                <li className="strike-through">Distribution</li>
                <li className="strike-through">Route53 Entry</li>
              </ul>
            </li>
            <li>
              CICD
              <ul>
                <li>Deploy website</li>
                <li>Deploy Infrastructure</li>
              </ul>
            </li>
            <li>
              Content
              <ul>
                <li className='strike-through'>Configure Node Sass</li>
                <li>Settle on a color scheme</li>
                <li>Routes</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default App;
