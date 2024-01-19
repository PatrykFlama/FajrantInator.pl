const searchParams = new URLSearchParams(window.location.search);
let filtersShowed = false;

if(courseName = searchParams.get(`courseName`)){
    document.getElementById(`courseName`).value = courseName;
}

if(listNumber = searchParams.get(`listNumber`)){
    document.getElementById(`listNumber`).value = listNumber;
}

if(taskNumber = searchParams.get(`taskNumber`)){
    document.getElementById(`taskNumber`).value = taskNumber;
}

if(orderPrice = searchParams.get(`orderPrice`)){
    document.getElementById(`orderPrice`).value = orderPrice;
}

if(searchString = searchParams.get(`searchString`)){
    document.getElementById(`searchString`).value = searchString;
}

if(owned = searchParams.get(`owned`)){
    document.getElementById(`owned`).value = owned;
}

function resetFilters() {
    window.location = window.location.href.split("?")[0];
}

function ToggleFilters(){
    filtersShowed = !filtersShowed;
    document.getElementById(`filtersFields`).style.display = filtersShowed ? `flex` : `none`;
    document.getElementById(`filterArrow`).innerHTML = filtersShowed ? `arrow_drop_down` : `arrow_drop_up`;
}

if(searchParams.size > 1){
    filtersShowed = true;
}


if(filtersShowed) {
    document.getElementById(`filtersFields`).style.display = `flex`;
    document.getElementById(`filterArrow`).innerHTML = `arrow_drop_down`;
}
