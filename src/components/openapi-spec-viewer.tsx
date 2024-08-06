import React, { useState } from 'react';
import { OpenAPISpecParser } from '../parser/OpenAPISpecParser';

// New TreeView component
const TreeView: React.FC<{ data: unknown, name?: string }> = ({ data, name }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (typeof data !== 'object' || data === null) {
    return (
      <div className="ml-4">
        {name && <span className="font-semibold">{name}: </span>}
        <span>{JSON.stringify(data)}</span>
      </div>
    );
  }

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="ml-4">
      <div onClick={toggle} className="cursor-pointer">
        {name && <span className="font-semibold">{name}</span>}
        <span className="ml-2">{isOpen ? '▼' : '►'}</span>
      </div>
      {isOpen && (
        <div className="ml-4">
          {Object.entries(data).map(([key, value]) => (
            <TreeView key={key} data={value} name={key} />
          ))}
        </div>
      )}
    </div>
  );
};

const OpenAPISpecViewer = () => {
  const [specText, setSpecText] = useState<string>('');
  const [parser, setParser] = useState<OpenAPISpecParser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('info');
  const [selectedPath, setSelectedPath] = useState<string>('');
  const [selectedComponent, setSelectedComponent] = useState<string>('');
  const [selectedComponentType, setSelectedComponentType] = useState<string>('schemas');

  const parseSpec = () => {
    try {
      const newParser = new OpenAPISpecParser(specText);
      setParser(newParser);
      setError(null);
      setSelectedPath('');
      setSelectedComponent('');
    } catch (err) {
      setError('Invalid OpenAPI specification');
      setParser(null);
    }
  };

  const renderInfo = () => {
    if (!parser) return null;
    const info = parser.getInfo();
    return (
      <div>
        <h2 className="text-xl font-bold mb-2">API Information</h2>
        <TreeView data={info} />
      </div>
    );
  };

  const renderServers = () => {
    if (!parser) return null;
    const servers = parser.getServers();
    return (
      <div>
        <h2 className="text-xl font-bold mb-2">Servers</h2>
        <TreeView data={servers} />
      </div>
    );
  };

  const renderPaths = () => {
    if (!parser) return null;
    const paths = parser.getPaths();
    return (
      <div>
        <h2 className="text-xl font-bold mb-2">Paths</h2>
        <select 
          onChange={(e) => setSelectedPath(e.target.value)} 
          value={selectedPath}
          className="w-full p-2 mb-4 border rounded"
        >
          <option value="">Select a path</option>
          {Object.keys(paths).map((path) => (
            <option key={path} value={path}>
              {path}
            </option>
          ))}
        </select>
        {selectedPath && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Path: {selectedPath}</h3>
            <TreeView data={paths[selectedPath]} />
          </div>
        )}
      </div>
    );
  };

  const renderComponents = () => {
    if (!parser) return null;
    const components = parser.getComponents();
    const componentTypes = ['schemas', 'responses', 'parameters', 'requestBodies', 'securitySchemes'];

    return (
      <div>
        <h2 className="text-xl font-bold mb-2">Components</h2>
        <select 
          onChange={(e) => setSelectedComponentType(e.target.value)} 
          value={selectedComponentType}
          className="w-full p-2 mb-2 border rounded"
        >
          {componentTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <select 
          onChange={(e) => setSelectedComponent(e.target.value)} 
          value={selectedComponent}
          className="w-full p-2 mb-4 border rounded"
        >
          <option value="">Select a component</option>
          {Object.keys(components[selectedComponentType] || {}).map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
        {selectedComponent && (
          <div>
            <h3 className="text-lg font-semibold mb-2">{selectedComponentType}: {selectedComponent}</h3>
            <TreeView data={components[selectedComponentType][selectedComponent]} />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">OpenAPI Specification Viewer</h1>
      <textarea
        value={specText}
        onChange={(e) => setSpecText(e.target.value)}
        placeholder="Paste your OpenAPI specification here..."
        className="w-full h-40 p-2 border rounded mb-4"
      />
      <button 
        onClick={parseSpec}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-4"
      >
        Parse Specification
      </button>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {parser && (
        <div>
          <div className="flex mb-4">
            {['info', 'servers', 'paths', 'components'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 mr-2 rounded ${
                  activeTab === tab ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          <div className="border p-4 rounded">
            {activeTab === 'info' && renderInfo()}
            {activeTab === 'servers' && renderServers()}
            {activeTab === 'paths' && renderPaths()}
            {activeTab === 'components' && renderComponents()}
          </div>
        </div>
      )}
    </div>
  );
};

export default OpenAPISpecViewer;