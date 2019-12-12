$(function(){
	let users;
	$.ajax({
	  url: 'https://randomuser.me/api/?results=20&inc=gender,name,location,dob&nat=us,ca',
	  dataType: 'json'
	})
		.done(res => {
			users = res.results;
			insertInTable(users);
		});

	$('.ascend').click(() => insertInTable(sortByAscending(users)));
	$('.discend').click(() => insertInTable(sortByDescending(users)));

	function dob(data){
		let date = new Date(data);
        let day = (+date.getDate() < 10)? `0${date.getDate()}`: date.getDate();
        let month = (+date.getMonth()+1 < 10)? `0${date.getMonth()+1}`: date.getMonth()+1;
        let year = date.getFullYear();
        return `${month}/${day}/${year}`
	}	

	function occurred(data){
		let date = new Date();
        let dob = new Date(data);
        if(+dob.getMonth()+1 < +date.getMonth()+1 || +dob.getMonth()+1 === +date.getMonth()+1 && +dob.getDate() < +date.getDate()){
            return 'Birthday has passed';
        }else if(+dob.getMonth()+1 === +date.getMonth()+1 && +dob.getDate() === +date.getDate()){
            return 'Birthday is today';
        }else if(+dob.getMonth()+1 > +date.getMonth()+1 || +dob.getMonth()+1 === +date.getMonth()+1 && +dob.getDate() > +date.getDate()){
            return "Birthday hasn't passed ";
        }
	}

	let sortByAscending = data => data.sort((a, b) => parseFloat(b.dob.age) - parseFloat(a.dob.age));
	let sortByDescending = data => data.sort((a, b) => parseFloat(a.dob.age) - parseFloat(b.dob.age));

	function insertInTable(result){
		$('tbody').children().remove();
		result.forEach((v,i) => {
			$('tbody').append(`
				 <tr>
	                 <th scope="row">${i+1}</th>
	                 <td>${ v.name.first }</td>
	                 <td>${ v.name.last }</td>
					 <td>${ v.gender }</td>
	                 <td>${ v.location.country }</td>
	                 <td>${ dob(v.dob.date) }</td>
	                 <td>${ occurred(v.dob.date) }</td>
	             </tr>
			`);
		})
	}
})