The basic concept we're discovering is that we run XML / YAML through a sequence of reversible processes, and then we can reverse that sequence and run the reverse of those processes to generate the corresponding YAML / XML.

XML -> XmlToJson -> ExpandFetchXml -> FormatJson -> PartitionJson -> JsonToYaml -> YAML
YAML -> YamlToJson -> DepartitionJson -> UnformatJson -> CollapseFetchXml -> JsonToXml -> XML