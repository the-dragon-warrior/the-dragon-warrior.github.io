window.onload = function(){
	// Buttons
	var quickAddBtn = document.getElementById('QuickAdd');
	var quickAddFormDiv = document.querySelector('.quickaddForm')
	var cancelBtn = document.getElementById('Cancel');
	var AddBtn = document.getElementById('Add');
    var headingText = document.getElementById('heading');
	// Form Fields
	var fullname = document.getElementById('fullname');
	var phone = document.getElementById('phone');
    var fullnameReview = document.getElementById('name-field');
    var phoneReview = document.getElementById('phone-field');
	// Divs etc.
	var addBookDiv = document.querySelector('.addbook');
    var addBookHeaderDiv = document.querySelector('.addbookheader');

	quickAddBtn.addEventListener("click", function(){
		quickAddFormDiv.style.display = "block";
        quickAddBtn.style.display = "none";
        addBookDiv.style.display = "none";
        addBookHeaderDiv.style.display = "none";
        fullnameReview.innerHTML = "";
        phoneReview.innerHTML = "";
        headingText.innerHTML = "ADD SUBSCRIBER"
	});

	cancelBtn.addEventListener("click", function(){
		quickAddFormDiv.style.display = "none";
        quickAddBtn.style.display = "block";
        addBookDiv.style.display = "block";
        addBookHeaderDiv.style.display = "block";
        headingText.innerHTML = "PHONE DIRECTORY"
	});
    
	AddBtn.addEventListener("click", addToBook);

	addBookDiv.addEventListener("click", removeEntry);
    
    fullname.addEventListener("input", updateNameValue);
    
    phone.addEventListener("input", updatePhoneValue);

	// Storage Array
	var contactList = [];

    function updateNameValue() {
         fullnameReview.innerHTML = fullname.value;
    }
    
    function updatePhoneValue() {
        phoneReview.innerHTML = phone.value;
    }
    
	function jsonStructure(fullname,phone){
		this.fullname = fullname;
		this.phone = phone;
	}

	function addToBook(){
		var isNull = fullname.value!='' && phone.value!='';
		if(isNull){
			// format the input into a valid JSON structure
			var obj = new jsonStructure(fullname.value,phone.value);
			contactList.push(obj);
			localStorage['addbook'] = JSON.stringify(contactList);
			quickAddFormDiv.style.display = "none";
            quickAddBtn.style.display = "block";
            addBookDiv.style.display = "block";
            addBookHeaderDiv.style.display = "block";
            headingText.innerHTML = "PHONE DIRECTORY"
			clearForm();
			showContactList();
		}
	}

	function removeEntry(e){
		// Remove an entry from the contactList
		if(e.target.classList.contains('delbutton')){
			var remID = e.target.getAttribute('data-id');
			contactList.splice(remID,1);
			localStorage['addbook'] = JSON.stringify(contactList);
			showContactList();
		}
	}

	function clearForm(){
		var formFields = document.querySelectorAll('.formFields');
		for(var i in formFields){
			formFields[i].value = '';
		}
	}

	function showContactList(){
		if(localStorage['addbook'] === undefined){
			localStorage['addbook'] = '';
		} else {
			contactList = JSON.parse(localStorage['addbook']);
			// Loop over the array contactList and insert into the page
			addBookDiv.innerHTML = '';
			for(var n in contactList){
				var str = '<div class="entry">';
					str += '<div class="name"><p>' + contactList[n].fullname + '</p></div>';
					str += '<div class="phone"><p>' + contactList[n].phone + '</p></div>';
					str += '<div class="del"><a href="#" class="delbutton btn btn-danger" data-id="' + n + '">Delete</a></div>';
					str += '</div>' + '<br>';
				addBookDiv.innerHTML += str;
			}
		}
	}

	showContactList();

}