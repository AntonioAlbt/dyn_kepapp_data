// dyn_kepapp_data: service for uploading logs
// Copyright (c) 2025 Antonio Albert

// This file is part of dyn_kepapp_data.

// dyn_kepapp_data is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// dyn_kepapp_data is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with dyn_kepapp_data.  If not, see <http://www.gnu.org/licenses/>.

// Diese Datei ist Teil von dyn_kepapp_data.

// dyn_kepapp_data ist Freie Software: Sie können es unter den Bedingungen
// der GNU General Public License, wie von der Free Software Foundation,
// Version 3 der Lizenz oder (nach Ihrer Wahl) jeder neueren
// veröffentlichten Version, weiter verteilen und/oder modifizieren.

// dyn_kepapp_data wird in der Hoffnung, dass es nützlich sein wird, aber
// OHNE JEDE GEWÄHRLEISTUNG, bereitgestellt; sogar ohne die implizite
// Gewährleistung der MARKTFÄHIGKEIT oder EIGNUNG FÜR EINEN BESTIMMTEN ZWECK.
// Siehe die GNU General Public License für weitere Details.

// Sie sollten eine Kopie der GNU General Public License zusammen mit
// dyn_kepapp_data erhalten haben. Wenn nicht, siehe <https://www.gnu.org/licenses/>.

import { LATEST_KEPLER_APP_VERSION_CODE, LATEST_KEPLER_APP_VERSION_NAME, npm_package_version } from "$env/static/private"
import { json } from "@sveltejs/kit"
import { parse as semverParse } from "semver"

export async function GET() {
    const ver = semverParse(npm_package_version)
    return json(
        {
            service: "dyn_kepapp_data",
            version: {
                string: npm_package_version,
                major: ver?.major,
                minor: ver?.minor,
                patch: ver?.patch
            },
            app_version: {
                name: LATEST_KEPLER_APP_VERSION_NAME,
                code: Number(LATEST_KEPLER_APP_VERSION_CODE)
            },
            services: {
                sommerfest: {
                    available: true
                }
            }
        }
    )
}
