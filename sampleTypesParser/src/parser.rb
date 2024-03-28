require 'json'

catalogo = './data/catalogoTestQC.json'

hashMap = JSON.parse( File.read(catalogo) )
data =hashMap["data"]

prevCode = 'HOla'

def normalizeGender(gender)
  case gender&.downcase&.strip
  when "femenino"
    "F"
  when "masculino"
    "M"
  when "indistinto"
    "OTHER"
  else
    ""
  end
end

def normalizeUnit(unit)
  case unit&.downcase&.strip
  when "años"
    "year"
  when "meses"
    "month"
  when "dias"
    "day"
  else
    ""
  end
end


def rankToList(test)
  
  gender = normalizeGender(test["rankGender"])
  # F M BOTH OTHER
  unit = normalizeUnit(test["rankUnity"])
  # YEAR MONTH DAY
  minAge = test["rankMinAge"].to_f
  maxAge = test["rankMaxAge"].to_f
  minRef = test["minRef"].to_f
  maxRef = test["maxRef"].to_f
  [{gender:, unit:, minAge:, maxAge:, :minReference => minRef, :maxReference => maxRef}]
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