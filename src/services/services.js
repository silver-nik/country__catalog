class Services {
    baseUrl = 'https://restcountries.com/v3.1/';

    getResources = async (url) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Couldn't fetch url: ${url}, status: ${res.status}`);
        }
        

        return await res.json();
    } 

    getAllCountries = async () => {
        const res = await this.getResources(`${this.baseUrl}/all`);

        return res.map((r, i) => {
            return this._transformCountry(r);
        });
    }

    getSingleCountry = async (name) => {
        const res = await this.getResources(`${this.baseUrl}/name/${name}?fullText=true`);

        return res.map((r, i) => {
            return this._transformCountry(r);
        });
    }

    _transformCountry = (country) => {
        return {
            name: country.name.common,
            flag: country.flags.png,
            capital: country.capital,
            translationRus: country.translations.rus.common,
            coatOfArms: country.coatOfArms.svg,
            maps: country.maps.googleMaps
        }
    }
}

export default Services;