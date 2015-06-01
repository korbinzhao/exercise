var arr = ["mad", "dam", "meat", "aetm", "cheater", "step", "theca", "hectare", "beat", "tame", "pest", "teacher", "tep", "abet", "beta", "tache", "teach", "team", "pet", "cheat", "teps", "bate", "meta", "reteach", "recheat"];

var newArr = [],
	str = '',
	len = arr.length,
	tempArr = [],
	resultArr = [];

//将原数组arr中所有的单词中的字母按字母表顺序重新排序，并将该单词与该单词在原数组中的位置index保存在新对象中，存入新数组newArr
for(var i = 0; i < len; i++){
	 newArr.push({
	 	"str": arr[i].split('').sort().join(''),
	 	"index": i
	 });
}

//根据比较单词大小，对新数组重新排序,这样可使所有同构体单词在newArr中紧挨在一起
newArr.sort(function (a, b) {
    return a.str.localeCompare(b.str);
});

str = newArr[0].str;
//对newArr进行遍历，将聚在一起的所有相同单词的index值存入tempArr中，然后将tempArr存在二维数组resultArr中
for(var i = 0; i < len; i++){
	if(str === newArr[i].str){
		tempArr.push(newArr[i].index);
	}
	else{
		resultArr.push(tempArr);
		tempArr = [];
		str = newArr[i].str;
		tempArr.push(newArr[i].index);
	}
}

console.log(resultArr);

//遍历resultArr，将同构体单词分组打印出来
for(var i = 0; i < resultArr.length; i++){
	for(var j = 0; j < resultArr[i].length; j++){
		console.log(arr[resultArr[i][j]]);
	}
	console.log('-----------------------');
}