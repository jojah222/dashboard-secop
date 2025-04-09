// Componente de contador para fechas límite
const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = React.useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false
  });

  React.useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = new Date(targetDate) - now;
      
      if (difference <= 0) {
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true
        };
      }
      
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
        isExpired: false
      };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (timeLeft.isExpired) {
    return React.createElement("span", { className: "text-red-600 font-bold" }, "VENCIDO");
  }

  return React.createElement(
    "div", 
    { className: "flex space-x-2 text-sm" },
    React.createElement("div", { className: "bg-blue-100 text-blue-800 rounded px-2 py-1" }, `${timeLeft.days}d`),
    React.createElement("div", { className: "bg-blue-100 text-blue-800 rounded px-2 py-1" }, `${timeLeft.hours}h`),
    React.createElement("div", { className: "bg-blue-100 text-blue-800 rounded px-2 py-1" }, `${timeLeft.minutes}m`),
    React.createElement("div", { className: "bg-blue-100 text-blue-800 rounded px-2 py-1" }, `${timeLeft.seconds}s`)
  );
};

// Componente principal del Dashboard
const DashboardCompleto = () => {
  // Datos para las visualizaciones
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#8dd1e1'];
  
  // Formatear moneda en formato colombiano
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const categorias = [
    { categoria: "Papelería/Elementos de Oficina", count: 3, valorTotal: 114658000 },
    { categoria: "Ferretería/Construcción", count: 1, valorTotal: 39000000 },
    { categoria: "Servicios de Apoyo Logístico", count: 2, valorTotal: 88837917 },
    { categoria: "Alimentación", count: 2, valorTotal: 43898000 },
    { categoria: "Elementos Electrodomésticos", count: 1, valorTotal: 19971500 }
  ];

  const municipios = [
    { municipio: "Puerto Salgar", valorTotal: 78800000 },
    { municipio: "Mosquera", valorTotal: 49037917 },
    { municipio: "Lenguazaque", valorTotal: 39858000 },
    { municipio: "Villapinzón", valorTotal: 39800000 },
    { municipio: "Subachoque", valorTotal: 35000000 },
    { municipio: "San Francisco", valorTotal: 27000000 },
    { municipio: "Facatativá", valorTotal: 19971500 },
    { municipio: "Anapoima", valorTotal: 16898000 }
  ];

  const procesos = [
    {
      id: "AMS-MC-006-2025",
      municipio: "Subachoque",
      objeto: "Adquisición de elementos de papelería y elementos de oficina",
      valorEstimado: 35000000,
      categoria: "Papelería/Elementos de Oficina",
      fechaPresentacion: "2025-04-08T15:00:00.000Z",
      limitadoMipymes: "Sí"
    },
    {
      id: "MC-016-2025",
      municipio: "Mosquera",
      objeto: "Prestación de servicios de apoyo logístico para celebración del día del niño",
      valorEstimado: 49037917,
      categoria: "Servicios de Apoyo Logístico",
      fechaPresentacion: "2025-04-08T19:05:00.000Z",
      limitadoMipymes: "No"
    },
    {
      id: "MC-005-2025",
      municipio: "San Francisco",
      objeto: "Suministro de alimentación con destino a la fuerza pública",
      valorEstimado: 27000000,
      categoria: "Alimentación",
      fechaPresentacion: "2025-04-08T20:00:00.000Z",
      limitadoMipymes: "No"
    },
    {
      id: "MC-023-2025",
      municipio: "Villapinzón",
      objeto: "Prestación de servicios de apoyo logístico para celebración del día del niño y Halloween",
      valorEstimado: 39800000,
      categoria: "Servicios de Apoyo Logístico",
      fechaPresentacion: "2025-04-09T14:00:00.000Z",
      limitadoMipymes: "No"
    },
    {
      id: "CMC-018-2025",
      municipio: "Puerto Salgar",
      objeto: "Suministro de herramientas y materiales de construcción, productos de ferretería",
      valorEstimado: 39000000,
      categoria: "Ferretería/Construcción",
      fechaPresentacion: "2025-04-09T17:00:00.000Z",
      limitadoMipymes: "No"
    },
    {
      id: "MINIMA CUANTIA 039-2025",
      municipio: "Anapoima",
      objeto: "Suministro de bolsa de polietileno jumbo industrial",
      valorEstimado: 16898000,
      categoria: "Alimentación",
      fechaPresentacion: "2025-04-09T21:00:00.000Z",
      limitadoMipymes: "No"
    },
    {
      id: "CMC-017-2025",
      municipio: "Puerto Salgar",
      objeto: "Suministro de papelería, útiles y elementos de escritorio",
      valorEstimado: 39800000,
      categoria: "Papelería/Elementos de Oficina",
      fechaPresentacion: "2025-04-09T23:00:00.000Z",
      limitadoMipymes: "No"
    },
    {
      id: "LMC-007-2025",
      municipio: "Lenguazaque",
      objeto: "Suministro de elementos de cafetería, aseo y papelería",
      valorEstimado: 39858000,
      categoria: "Papelería/Elementos de Oficina",
      fechaPresentacion: "2025-04-10T14:30:00.000Z",
      limitadoMipymes: "No"
    }
  ];

  // Organizar datos para el cronograma
  const datosCronograma = procesos.map(proceso => ({
    ...proceso,
    x: new Date(proceso.fechaPresentacion).getTime(),
    y: proceso.municipio,
    z: proceso.valorEstimado / 1000000 // Valor en millones
  }));

  // Organizar por categoría para el cronograma
  const cronogramaPorCategoria = {};
  procesos.forEach(proceso => {
    if (!cronogramaPorCategoria[proceso.categoria]) {
      cronogramaPorCategoria[proceso.categoria] = [];
    }
    cronogramaPorCategoria[proceso.categoria].push({
      ...proceso,
      x: new Date(proceso.fechaPresentacion).getTime(),
      y: proceso.municipio,
      z: proceso.valorEstimado / 1000000 // Valor en millones
    });
  });

  // Colores para cada categoría
  const coloresCategorias = {
    "Papelería/Elementos de Oficina": "#0088FE",
    "Ferretería/Construcción": "#00C49F", 
    "Servicios de Apoyo Logístico": "#FFBB28",
    "Alimentación": "#FF8042",
    "Elementos Electrodomésticos": "#8884d8"
  };

  const [activeTab, setActiveTab] = React.useState('dashboard');
  const [sortColumn, setSortColumn] = React.useState('fechaPresentacion');
  const [sortDirection, setSortDirection] = React.useState('asc');

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const sortedProcesos = [...procesos].sort((a, b) => {
    if (sortColumn === 'fechaPresentacion') {
      return sortDirection === 'asc' 
        ? new Date(a.fechaPresentacion) - new Date(b.fechaPresentacion)
        : new Date(b.fechaPresentacion) - new Date(a.fechaPresentacion);
    } else if (sortColumn === 'valorEstimado') {
      return sortDirection === 'asc' 
        ? a.valorEstimado - b.valorEstimado
        : b.valorEstimado - a.valorEstimado;
    } else {
      return sortDirection === 'asc'
        ? a[sortColumn].localeCompare(b[sortColumn])
        : b[sortColumn].localeCompare(a[sortColumn]);
    }
  });

  // Formatear fecha para el tooltip del cronograma
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('es-CO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Fecha actual para la línea de referencia
  const fechaActual = new Date();

  return React.createElement(
    "div",
    { className: "bg-gray-100 min-h-screen p-4" },
    React.createElement(
      "div",
      { className: "container mx-auto" },
      // Cabecera principal
      React.createElement(
        "div",
        { className: "bg-white shadow-lg rounded-lg p-6 mb-6" },
        React.createElement("h1", { className: "text-3xl font-bold text-center text-blue-800 mb-2" }, "Monitor de Procesos SECOP II"),
        React.createElement("p", { className: "text-center text-gray-600 mb-6" }, "Grupo Ríola - Panel de Control de Licitaciones de Mínima Cuantía"),
        
        // Tabs de navegación
        React.createElement(
          "div",
          { className: "flex justify-center space-x-4 border-b mb-6" },
          React.createElement(
            "button",
            { 
              className: `px-4 py-2 ${activeTab === 'dashboard' ? 'border-b-2 border-blue-600 text-blue-600 font-semibold' : 'text-gray-600'}`,
              onClick: () => setActiveTab('dashboard')
            },
            "Dashboard General"
          ),
          React.createElement(
            "button",
            { 
              className: `px-4 py-2 ${activeTab === 'procesos' ? 'border-b-2 border-blue-600 text-blue-600 font-semibold' : 'text-gray-600'}`,
              onClick: () => setActiveTab('procesos')
            },
            "Lista de Procesos"
          )
        ),
        
        // Contenido del Dashboard
        activeTab === 'dashboard' && React.createElement(
          "div",
          { className: "grid grid-cols-1 md:grid-cols-2 gap-6" },
          
          // Resumen de KPIs
          React.createElement(
            "div",
            { className: "bg-blue-50 rounded-lg p-4 shadow col-span-1 md:col-span-2" },
            React.createElement("h2", { className: "text-lg font-semibold mb-4 text-blue-800" }, "Resumen de Procesos"),
            React.createElement(
              "div",
              { className: "grid grid-cols-1 md:grid-cols-4 gap-4" },
              React.createElement(
                "div",
                { className: "bg-white rounded-lg p-4 shadow" },
                React.createElement("p", { className: "text-sm text-gray-500" }, "Procesos Activos"),
                React.createElement("p", { className: "text-2xl font-bold" }, procesos.length)
              ),
              React.createElement(
                "div",
                { className: "bg-white rounded-lg p-4 shadow" },
                React.createElement("p", { className: "text-sm text-gray-500" }, "Valor Total"),
                React.createElement("p", { className: "text-2xl font-bold" }, formatCurrency(procesos.reduce((sum, p) => sum + p.valorEstimado, 0)))
              ),
              React.createElement(
                "div",
                { className: "bg-white rounded-lg p-4 shadow" },
                React.createElement("p", { className: "text-sm text-gray-500" }, "Categorías"),
                React.createElement("p", { className: "text-2xl font-bold" }, categorias.length)
              ),
              React.createElement(
                "div",
                { className: "bg-white rounded-lg p-4 shadow" },
                React.createElement("p", { className: "text-sm text-gray-500" }, "Municipios"),
                React.createElement("p", { className: "text-2xl font-bold" }, municipios.length)
              )
            )
          ),
          
          // Próximos Procesos a Vencer
          React.createElement(
            "div",
            { className: "bg-white rounded-lg p-4 shadow col-span-1 md:col-span-2" },
            React.createElement("h2", { className: "text-lg font-semibold mb-4 text-blue-800" }, "Próximos Procesos a Vencer"),
            React.createElement(
              "div",
              { className: "overflow-x-auto" },
              React.createElement(
                "table",
                { className: "min-w-full bg-white" },
                React.createElement(
                  "thead",
                  { className: "bg-gray-100" },
                  React.createElement(
                    "tr",
                    null,
                    React.createElement("th", { className: "py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Proceso"),
                    React.createElement("th", { className: "py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Municipio"),
                    React.createElement("th", { className: "py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Categoría"),
                    React.createElement("th", { className: "py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Valor"),
                    React.createElement("th", { className: "py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Fecha Límite"),
                    React.createElement("th", { className: "py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, "Tiempo Restante")
                  )
                ),
                React.createElement(
                  "tbody",
                  { className: "divide-y divide-gray-200" },
                  sortedProcesos.slice(0, 5).map((proceso) => (
                    React.createElement(
                      "tr",
                      { key: proceso.id },
                      React.createElement("td", { className: "py-2 px-3 text-sm text-gray-900" }, proceso.id),
                      React.createElement("td", { className: "py-2 px-3 text-sm text-gray-500" }, proceso.municipio),
                      React.createElement("td", { className: "py-2 px-3 text-sm text-gray-500" }, proceso.categoria),
                      React.createElement("td", { className: "py-2 px-3 text-sm text-gray-500" }, formatCurrency(proceso.valorEstimado)),
                      React.createElement(
                        "td", 
                        { className: "py-2 px-3 text-sm text-gray-500" },
                        new Date(proceso.fechaPresentacion).toLocaleString('es-CO', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })
                      ),
                      React.createElement(
                        "td", 
                        { className: "py-2 px-3 text-sm" },
                        React.createElement(CountdownTimer, { targetDate: proceso.fechaPresentacion })
                      )
                    )
                  ))
                )
              )
            )
          )
        ),
        
        // Lista de Procesos
        activeTab === 'procesos' && React.createElement(
          "div",
          { className: "overflow-x-auto" },
          React.createElement(
            "table",
            { className: "min-w-full bg-white" },
            React.createElement(
              "thead",
              { className: "bg-gray-100" },
              React.createElement(
                "tr",
                null,
                React.createElement(
                  "th", 
                  { 
                    className: "py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer",
                    onClick: () => handleSort('id')
                  }, 
                  "Proceso ",
                  sortColumn === 'id' ? (sortDirection === 'asc' ? '▲' : '▼') : ''
                ),
                React.createElement(
                  "th", 
                  { 
                    className: "py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer",
                    onClick: () => handleSort('municipio')
                  }, 
                  "Municipio ",
                  sortColumn === 'municipio' ? (sortDirection === 'asc' ? '▲' : '▼') : ''
                ),
                React.createElement(
                  "th", 
                  { className: "py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, 
                  "Objeto"
                ),
                React.createElement(
                  "th", 
                  { 
                    className: "py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer",
                    onClick: () => handleSort('categoria')
                  }, 
                  "Categoría ",
                  sortColumn === 'categoria' ? (sortDirection === 'asc' ? '▲' : '▼') : ''
                ),
                React.createElement(
                  "th", 
                  { 
                    className: "py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer",
                    onClick: () => handleSort('valorEstimado')
                  }, 
                  "Valor ",
                  sortColumn === 'valorEstimado' ? (sortDirection === 'asc' ? '▲' : '▼') : ''
                ),
                React.createElement(
                  "th", 
                  { 
                    className: "py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer",
                    onClick: () => handleSort('fechaPresentacion')
                  }, 
                  "Fecha Límite ",
                  sortColumn === 'fechaPresentacion' ? (sortDirection === 'asc' ? '▲' : '▼') : ''
                ),
                React.createElement(
                  "th", 
                  { className: "py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, 
                  "Tiempo Restante"
                ),
                React.createElement(
                  "th", 
                  { className: "py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" }, 
                  "MiPymes"
                )
              )
            ),
            React.createElement(
              "tbody",
              { className: "divide-y divide-gray-200" },
              sortedProcesos.map((proceso) => (
                React.createElement(
                  "tr",
                  { key: proceso.id },
                  React.createElement("td", { className: "py-2 px-3 text-sm font-medium text-blue-600" }, proceso.id),
                  React.createElement("td", { className: "py-2 px-3 text-sm text-gray-500" }, proceso.municipio),
                  React.createElement("td", { className: "py-2 px-3 text-sm text-gray-900" }, proceso.objeto),
                  React.createElement("td", { className: "py-2 px-3 text-sm text-gray-500" }, proceso.categoria),
                  React.createElement("td", { className: "py-2 px-3 text-sm text-gray-500" }, formatCurrency(proceso.valorEstimado)),
                  React.createElement(
                    "td", 
                    { className: "py-2 px-3 text-sm text-gray-500" },
                    new Date(proceso.fechaPresentacion).toLocaleString('es-CO', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })
                  ),
                  React.createElement(
                    "td", 
                    { className: "py-2 px-3 text-sm" },
                    React.createElement(CountdownTimer, { targetDate: proceso.fechaPresentacion })
                  ),
                  React.createElement(
                    "td", 
                    { className: "py-2 px-3 text-sm" },
                    proceso.limitadoMipymes === "Sí" ? 
                      React.createElement("span", { className: "px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800" }, "Sí") : 
                      React.createElement("span", { className: "px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800" }, "No")
                  )
                )
              ))
            )
          )
        )
      ),
      
      // Sección de Recomendaciones
      React.createElement(
        "div",
        { className: "bg-white shadow rounded-lg p-4" },
        React.createElement("h2", { className: "text-xl font-bold mb-4 text-blue-800" }, "Recomendaciones"),
        React.createElement(
          "div",
          { className: "space-y-4" },
          React.createElement(
            "div",
            { className: "border-l-4 border-blue-500 pl-4 py-2" },
            React.createElement("h3", { className: "font-semibold" }, "Priorización inmediata:"),
            React.createElement("p", { className: "text-gray-700 mt-1" }, "Considerar participar en los procesos que cierran hoy:"),
            React.createElement(
              "ul",
              { className: "list-disc ml-6 mt-2 text-gray-700" },
              React.createElement("li", null, "AMS-MC-006-2025 (Subachoque) - Papelería - Cierra 8/04/2025 (10:00 AM)"),
              React.createElement("li", null, "MC-016-2025 (Mosquera) - Apoyo Logístico - Cierra 8/04/2025 (2:05 PM)"),
              React.createElement("li", null, "MC-005-2025 (San Francisco) - Alimentación - Cierra 8/04/2025 (3:00 PM)")
            )
          ),
          React.createElement(
            "div",
            { className: "border-l-4 border-green-500 pl-4 py-2" },
            React.createElement("h3", { className: "font-semibold" }, "Segunda prioridad (procesos con cierre el 9 de abril):"),
            React.createElement(
              "ul",
              { className: "list-disc ml-6 mt-2 text-gray-700" },
              React.createElement("li", null, "CMC-018-2025 (Puerto Salgar) - Ferretería"),
              React.createElement("li", null, "CMC-017-2025 (Puerto Salgar) - Papelería")
            )
          ),
          React.createElement(
            "div",
            { className: "border-l-4 border-amber-500 pl-4 py-2" },
            React.createElement("h3", { className: "font-semibold" }, "Enfoque en categorías específicas:"),
            React.createElement(
              "p", 
              { className: "text-gray-700 mt-1" }, 
              "De acuerdo con el análisis, los procesos de papelería y elementos de oficina representan la mayor oportunidad en términos de número de procesos y valor total ($153,658,000)."
            )
          ),
          React.createElement(
            "div",
            { className: "border-l-4 border-purple-500 pl-4 py-2" },
            React.createElement("h3", { className: "font-semibold" }, "Verificar requisitos:"),
            React.createElement(
              "p", 
              { className: "text-gray-700 mt-1" }, 
              "Cada proceso tiene requisitos específicos de capacidad jurídica, técnica y experiencia mínima que deben cumplirse para participar."
            )
          )
        )
      )
    )
  );
};

// Renderizar el dashboard
ReactDOM.render(
  React.createElement(DashboardCompleto, null),
  document.getElementById('root')
);