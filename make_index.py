import re
import gzip

# Define the regular expressions to find CSS and JS file references in the HTML
css_regex = re.compile(r'<link\shref=["\']([^"\']+)["\'].*?>')
js_regex = re.compile(r'<script\s.*?src=["\']([^"\']+)["\'].*?(?:type=["\']application\/javascript["\'].*?)?>')
# js_regex = re.compile(r'<script\s.*?src=["\']([^"\']+)["\'].*?\stype=["\']application\/javascript["\'].*?>')


def include_css_js(html_file_path):
    # Read the HTML file
    with open(html_file_path, 'r') as f:
        html_content = f.read()

    # Find all CSS and JS file references in the HTML
    css_files = css_regex.findall(html_content)
    js_files = js_regex.findall(html_content)

    # Include the content of each CSS file in the HTML
    for css_file in css_files:
        with open(css_file, 'r') as f:
            css_content = f.read()
            html_content = html_content.replace(f'<link href="{css_file}" rel="stylesheet">', f'<style>\n{css_content}\n</style>')

    # # Include the content of each JS file in the HTML
    for js_file in js_files:
        with open(js_file, 'r') as f:
            js_content = f.read()
            html_content = html_content.replace(f'<script src="{js_file}">', f'<script>\n{js_content}\n')

    # # Write the final HTML file with CSS and JS included
    # with open('output.html', 'w') as f:
    #     f.write(html_content)

    # # Compress the final HTML output to a Gzip file
    with gzip.open('index.html.gz', 'wb') as f:
        f.write(html_content.encode('utf-8'))

include_css_js('index.html')

