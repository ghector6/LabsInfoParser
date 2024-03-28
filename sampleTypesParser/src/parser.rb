require 'json'

catalogo = './data/catalogoTestQC.json'

hashMap = JSON.parse( File.read(catalogo) )
data =hashMap["data"]

prevCode = 'HOla'

def rankToList(test)
  
  gender = test["rankGender"]
  unit = test["rankUnity"]
  minAge = test["rankMinAge"]
  maxAge = test["rankMaxAge"]
  minRef = test["minRef"]
  maxRef = test["maxRef"]
  [{gender:, unit:, minAge:, maxAge:, minRef:, maxRef:}]
end


data.map! do |test|
  if test["code"]==''
    test["code"] = prevCode
  else 
    prevCode = test["code"]
  end
  test["ranks"] = rankToList(test)
  test.keep_if {|key, value| value!=""}
end

condensedMap = Hash.new

data.each do |i|
  code = (i["code"])
  if condensedMap[(code)] != nil
    condensedMap[(code)]["ranks"] += i["ranks"]
  else
    condensedMap[(code)] = i
  end
end

condensedMap.transform_values! do |v|
  if v["ranks"][0][:gender]== ''
    v["ranks"] = nil
  end
  v.compact
end 

File.write('./data/catalogoTestQC-Condensado.json', JSON.generate(condensedMap) )