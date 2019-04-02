'use strict';

/**
 * @description Filter the phones based on <code>filterTerm</code>
 * @param {Object[]} phoneList List of phone data
 * @param {string} filterTerm Filter word
 */
const filter = (phoneList, filterTerm) => {
  if (!filterTerm) return phoneList;
  return phoneList.filter(phone => {
    let matchingText = phone.name.includes(filterTerm) || phone.specs.manufacturer.includes(filterTerm)
      || phone.specs.os.includes(filterTerm),
      matchingNum = phone.specs.storage.toString().includes(filterTerm)
      || phone.specs.camera.toString().includes(filterTerm)
      || phone.price.toString().includes(filterTerm);
    
    return matchingText || matchingNum;
  });
};

/**
 * @description Display phones' details contained in *data*.
 * @param {Object[]} phoneList Phone list
 */
const displayPhones = (phoneList) => {
  let items = phoneList.map(phone => `
    <li>
			<a href="#" class="product-photo">
				<img src="${phone.image.small}" height="130" alt="${phone.name}">
			</a>
			<h2><a href="#"> ${phone.name} </a></h2>
			<ul class="product-description">
				<li><span>Manufacturer: </span>${phone.specs.manufacturer}</li>
				<li><span>Storage: </span>${phone.specs.storage} GB</li>
				<li><span>OS: </span>${phone.specs.os}</li>
				<li><span>Camera: </span>${phone.specs.camera} Mpx</li>
				<li><span>Description: </span>${phone.description}</li>
			</ul>
			<p class="product-price">£${phone.price}</p>
		</li>`);
  $('#productList').html(items.length ? items.join('') : '<h3>No phone found :(</h3>');
};

$(document).ready(() => {
  let phones = [];
  $.getJSON('products.json', (data) => {
    phones = data;
    displayPhones(phones);
  });
  $('#search').on('change', function () {
    displayPhones(filter(phones, this.value));
  });
});