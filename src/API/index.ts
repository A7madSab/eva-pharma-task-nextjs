import { Country } from "src/types"
import axios from "src/utils/axios"

export const getAllCountries = async (): Promise<Country[]> => {
  const { data }: { data: Country[] } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/country`)
  return data
}

export const getCountrybyId = async ({ id }: { id: number | string | string[] }): Promise<Country> => {
  const { data }: { data: Country } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/country/${id}`)
  return data
}

export const addCountries = async ({ country }: { country: string }) => {
  await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/country`, { name: country })
}

export const addCityToCountries = async ({ city, countryId }: { city: string; countryId: number }) => {
  await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/city`, { Name: city, CountryId: countryId })
}

export const deleteCountry = async ({ id }: { id: number }) => {
  await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/country/${id}`)
}

export const editCountry = async ({ id, name }: { id: number; name: string }) => {
  const body = { id, Name: name }
  await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/country`, body)
}
