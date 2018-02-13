function connect(method, query, callback) {
    const xhr = new XMLHttpRequest();
    const url = `http://localhost:8080${query}`;
    xhr.open(method, url);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        callback(data);
      }
    };
    xhr.send();
  }
  
  
function createTableBody(data) {
    const tbody = document.getElementById('ticket-rows');
    tbody.innerHTML = '';
  
   
      data.forEach((ticket) => {
        const tableRow = document.createElement('tr');
  
		// ID
		const IDCell = document.createElement('td');
        IDCell.appendChild(document.createTextNode(ticket.id));
        tableRow.appendChild(IDCell);
		
		// Reporter
		// TODO join table is missing from server side
		
		// Manufacturer
		const manufacturerCell = document.createElement('td');
        manufacturerCell.appendChild(document.createTextNode(ticket.manufacturer));
        tableRow.appendChild(manufacturerCell);
		
		// Serial Number
		const serialNumberCell = document.createElement('td');
        serialNumberCell.appendChild(document.createTextNode(ticket.serial_numbers));
        tableRow.appendChild(serialNumberCell);
		
		// Description
		const descriptionCell = document.createElement('td');
        descriptionCell.appendChild(document.createTextNode(ticket.description));
        tableRow.appendChild(descriptionCell);
		
		// DATE
		const dateCell = document.createElement('td');
        dateCell.appendChild(document.createTextNode(planetInfo.date));
        tableRow.appendChild(dateCell);
		
		// DELETE BUTTON
		const buttonCell = document.createElement('td');
         // TODO send DELETE
    
        tableRow.appendChild(buttonCell);
  
  
  
        
      });
  }
  
  connect('GET', '/tickets', createTableBody);